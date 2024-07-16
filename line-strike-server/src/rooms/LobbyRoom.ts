import { Schema, MapSchema, type, filter } from "@colyseus/schema";

import { Client, matchMaker, Room, ServerError } from "colyseus";
import { SECRET_LINE_STRIKE_KEY, SECRET_LOBBY_KEY } from "../utils/keys";
import { Format } from "./schema/Format";

const OnlySeenByOwner = (player: LobbyPlayer, client: Client) =>
  client.sessionId === player.sessionID;

class LineStrikeChallenger extends Schema {
  @type("string")
  name: string;

  @type("string")
  message: string;

  @type("uint64")
  formatID: number;

  @type("uint64")
  created: number;

  constructor(name: string, formatID: number, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.formatID = formatID;
    this.created = Date.now();
  }
}

class LobbyPlayer extends Schema {
  @type("string")
  sessionID: string;

  @type("string")
  name: string;

  @type("string")
  room: string | null;

  @filter(OnlySeenByOwner)
  @type({ map: LineStrikeChallenger })
  challenges: MapSchema<LineStrikeChallenger>;

  constructor(sessionID: string, name: string) {
    super();
    this.sessionID = sessionID;
    this.challenges = new MapSchema();
    this.name = name;
    this.room = null;
  }
}

class LobbyRoomState extends Schema {
  @type({ map: LobbyPlayer })
  players: MapSchema<LobbyPlayer>;

  constructor() {
    super();
    this.players = new MapSchema();
  }
}

export type JoinOptions = {
  name: "string";
};

export class LobbyRoom extends Room<LobbyRoomState> {
  async onCreate(options: any) {
    if (options?.__secret_lobby_key__ !== SECRET_LOBBY_KEY) {
      throw new Error("Failed to create lobby, missing key!");
    }
    console.log(`Creating lobby #${this.roomId}...`);
    this.autoDispose = false;
    this.setState(new LobbyRoomState());
    this.onMessage("free", this.onFreePlay);
    this.onMessage("challenge", this.onChallenge);
    this.onMessage("accept", this.onChallengeAccepted);
    this.onMessage("reject", this.onChallengeRejected);
    this.onMessage("name", this.onNameChange);
    this.onMessage("spectate", this.onSpectate);
  }

  onFreePlay = async (client: Client) => {};

  onChallenge = async (client: Client, options: any) => {
    const challenger = this.state.players.get(client.sessionId);
    const challenged = this.state.players.get(options?.clientId);
    const format = Format.COLLECTION[options.formatID];
    if (!challenged || !challenger || !format) return;
    if (challenged.challenges.has(client.sessionId)) return;

    console.log(
      `${challenger.name} (#${client.sessionId}) challenges ${challenged.name} (#${client.sessionId}) on a battle of ${format.name}`
    );

    challenged.challenges.set(
      client.sessionId,
      new LineStrikeChallenger(
        challenger.name,
        options.formatID,
        options?.message || "Want to play a match of Line Strike?"
      )
    );
  };

  onChallengeAccepted = async (client: Client, clientId: any) => {
    const challenged = this.state.players.get(client.sessionId);
    const challenger = this.state.players.get(clientId);
    if (!challenged || !challenger) return;
    if (!challenged.challenges.has(clientId)) return;

    const { formatID } = challenged.challenges.get(clientId);
    challenged.challenges.delete(clientId);
    const room = await matchMaker.createRoom("free_line_strike", {
      __secret_line_strike_key__: SECRET_LINE_STRIKE_KEY,
      formatID,
      challenger: {
        name: challenger.name,
        id: challenged.sessionID,
      },
      challenged: {
        name: challenged.name,
        id: challenged.sessionID,
      },
      type: "free",
    });
    const [a, b] = await Promise.all([
      matchMaker.joinById(room.roomId, {
        name: challenged.name,
        id: challenged.sessionID,
      }),
      matchMaker.joinById(room.roomId, {
        name: challenger.name,
        id: challenger.sessionID,
      }),
    ]);
    client.send("battle", {
      seat: a,
      opponent: challenger.name,
      type: "free",
      formatID,
      specatator: false,
    });
    const client2 = this.clients.getById(clientId);
    client2.send("battle", {
      seat: b,
      opponent: challenged.name,
      type: "free",
      formatID,
      spectator: false,
    });
    console.log(
      `${challenged.name} (#${challenged.sessionID}) accepted ${challenger.name} ${challenger.sessionID} and went to room #${room.roomId}`
    );
  };

  onChallengeRejected = async (client: Client, clientId: any) => {
    const challenged = this.state.players.get(client.sessionId);
    if (!challenged?.challenges.has(clientId)) return;

    const challenger = challenged.challenges.get(clientId);
    console.log(
      `${challenged.name} (#${challenged.sessionID}) rejected ${challenger.name} (#${clientId}})...`
    );
    challenged.challenges.delete(clientId);
  };

  onNameChange = async (client: Client, name: any) => {
    if (typeof name !== "string") return;

    const player = this.state.players.get(client.sessionId);
    player.name = name;
  };

  onSpectate = async (client: Client, roomId: any) => {
    if (typeof roomId !== "string") return;
    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    const seat = await matchMaker.joinById(roomId, {
      name: player.name,
      id: player.sessionID,
    });
    const room = await matchMaker.getRoomById(roomId);
    client.send("battle", {
      ...room.metadata,
      seat,
      spectator: true,
    });
  };

  async onDispose() {
    console.log(`Removing lobby #${this.roomId}...`);
  }

  async onAuth(client: Client, options: any) {
    if (typeof options?.name !== "string")
      throw new ServerError(422, "Must have a name to join");
    if (options.name.length < 1)
      throw new ServerError(422, "Must have a name to join");

    return options.name;
  }

  async onJoin(client: Client, options: JoinOptions) {
    console.log(
      `${options.name} joined the lobby with id #${client.sessionId}!`
    );
    this.state.players.set(
      client.sessionId,
      new LobbyPlayer(client.sessionId, options.name)
    );
  }

  async onLeave(client: Client, consented: boolean) {
    if (consented) {
      console.log(`client #${client.sessionId} left!`);
    } else {
      try {
        console.log(
          `client #${client.sessionId} disconected... Reconnection attempted.`
        );
        await this.allowReconnection(client, 2);
        console.log(`client #${client.sessionId} connected back...`);
      } catch (error) {
        console.log(`client #${client.sessionId} did not come back...`);
      }
    }
    this.state.players.delete(client.sessionId);
  }
}
