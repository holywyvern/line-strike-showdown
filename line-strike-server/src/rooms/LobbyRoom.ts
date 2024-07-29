import { Schema, MapSchema, type, filter } from "@colyseus/schema";
import { StatusCodes } from "http-status-codes";

import {
  Client,
  matchMaker,
  Room,
  RoomListingData,
  ServerError,
} from "colyseus";
import { SECRET_LINE_STRIKE_KEY, SECRET_LOBBY_KEY } from "../utils/keys";
import { Format } from "./schema/Format";
import { AuthToken } from "../services/AuthToken";
import { database } from "../database";

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
  accountID: string | null;

  @type("string")
  sessionID: string;

  @type("string")
  name: string;

  @type("string")
  room: string | null;

  @filter(OnlySeenByOwner)
  @type({ map: LineStrikeChallenger })
  challenges: MapSchema<LineStrikeChallenger>;

  @type("boolean")
  matching: boolean;

  @type("uint64")
  matchingSince: number;

  @type("boolean")
  hasProfile: boolean;

  constructor(
    sessionID: string,
    name: string,
    accountID: string | null = null
  ) {
    super();
    this.accountID = accountID && String(accountID);
    this.sessionID = sessionID;
    this.challenges = new MapSchema();
    this.matching = false;
    this.matchingSince = 0;
    this.hasProfile = Boolean(accountID);
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
  static instance: RoomListingData = null;

  async onCreate(options: any) {
    if (options?.__secret_lobby_key__ !== SECRET_LOBBY_KEY) {
      throw new Error("Failed to create lobby, missing key!");
    }
    this.autoDispose = false;
    this.setState(new LobbyRoomState());

    this.onMessage("ranked", this.onRanked);
    this.onMessage("unranked", this.onUnranked);
    this.onMessage("challenge", this.onChallenge);
    this.onMessage("accept", this.onChallengeAccepted);
    this.onMessage("reject", this.onChallengeRejected);
    this.onMessage("name", this.onNameChange);
    this.onMessage("spectate", this.onSpectate);
    this.onMessage("replay", this.onReplay);
  }

  onRanked = async (client: Client, formatID: any) => {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;
    if (player.matching) return;
    if (!Format.COLLECTION[formatID]) return;
    if (!player.accountID) return;

    player.matching = true;
    const seat = await matchMaker.joinOrCreate("ranked", {
      formatID,
      name: player.name,
      playerID: player.sessionID,
      accountID: player.accountID,
      __secret_lobby_key__: SECRET_LOBBY_KEY,
    });
    const since = Date.now();
    client.send("queue", { seat, since, type: "Ranked" });
  };

  onUnranked = async (client: Client, formatID: any) => {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;
    if (player.matching) return;
    if (!Format.COLLECTION[formatID]) return;

    player.matching = true;
    const seat = await matchMaker.joinOrCreate("unranked", {
      formatID,
      name: player.name,
      playerID: player.sessionID,
      accountID: player.accountID,
      __secret_lobby_key__: SECRET_LOBBY_KEY,
    });
    const since = Date.now();
    client.send("queue", { seat, since, type: "Unranked" });
  };

  onChallenge = async (client: Client, options: any) => {
    const challenger = this.state.players.get(client.sessionId);
    const challenged = this.state.players.get(options?.clientId);
    const format = Format.COLLECTION[options.formatID];
    if (!challenged || !challenger || !format) return;
    if (challenged.challenges.has(client.sessionId)) return;

    challenged.challenges.set(
      client.sessionId,
      new LineStrikeChallenger(
        challenger.name,
        options.formatID,
        options?.message || "Want to play a match of Line Strike?"
      )
    );
    this.clients.getById(challenged.sessionID)?.send("new-challenge");
  };

  onChallengeAccepted = async (client: Client, clientId: any) => {
    const challenged = this.state.players.get(client.sessionId);
    const challenger = this.state.players.get(clientId);
    if (!challenged || !challenger) return;
    if (!challenged.challenges.has(clientId)) return;

    const { formatID } = challenged.challenges.get(clientId);
    challenged.challenges.delete(clientId);

    return this.onMatchmakeFound(client.sessionId, clientId, formatID);
  };

  onChallengeRejected = async (client: Client, clientId: any) => {
    const challenged = this.state.players.get(client.sessionId);
    if (!challenged?.challenges.has(clientId)) return;

    const challenger = challenged.challenges.get(clientId);
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

    try {
      const seat = await matchMaker.joinById(roomId, {
        name: player.name,
        id: player.sessionID,
        accountID: player.accountID,
      });
      const room = await matchMaker.getRoomById(roomId);
      client.send("battle", {
        ...room.metadata,
        seat,
        spectator: true,
      });
    } catch (error) {
      console.error(error);
      client.send("battle-error", roomId);
    }
  };

  onReplay = async (client: Client, options: any) => {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;
    try {
      const { id, invert } = options || {};

      const match = await database.matchRecord.findUniqueOrThrow({
        where: { id: BigInt(id) },
        select: {
          formatID: true,
          playerA: { select: { name: true, sessionID: true } },
          playerB: { select: { name: true, sessionID: true } },
        },
      });
      const { formatID, playerA, playerB } = match;
      const challenger = invert ? playerB : playerA;
      const challenged = invert ? playerA : playerB;
      const room = await matchMaker.createRoom("replay", {
        __secret_line_strike_key__: SECRET_LINE_STRIKE_KEY,
        formatID,
        challenger: {
          name: challenger.name,
          id: `replay-${challenged.sessionID}`,
        },
        challenged: {
          name: challenged.name,
          id: `replay-${challenged.sessionID}`,
        },
        type: "replay",
        invert,
        matchID: String(id),
      });
      const seat = await matchMaker.reserveSeatFor(room, {
        name: player.name,
        id: player.sessionID,
        accountID: player.accountID,
      });
      client.send("replay", {
        seat,
        formatID,
        challenged,
        challenger,
        id: options.id,
      });
    } catch (error) {
      console.error(error);
      client.send("replay-error", options?.id);
    }
  };

  async onDispose() {}

  async onAuth(client: Client, options: any) {
    if (typeof options?.name !== "string")
      throw new ServerError(
        StatusCodes.UNAUTHORIZED,
        "Must have a name to join"
      );
    if (options.name.length < 1)
      throw new ServerError(
        StatusCodes.UNAUTHORIZED,
        "Must have a name to join"
      );

    if (options.token) {
      try {
        const { id } = await AuthToken.verify(options.token);
        console.log("Account ", id, "logged as ", options.name);
        return { id };
      } catch (error) {
        console.log(error);
      }
    }

    return { name: options.name };
  }

  async onJoin(client: Client, options: JoinOptions, auth: any) {
    const player = new LobbyPlayer(client.sessionId, options.name, auth?.id);
    this.state.players.set(client.sessionId, player);
  }

  async onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
  }

  async onMatchmakeFound(
    id1: string,
    id2: string,
    formatID: number,
    type = "free"
  ) {
    const challenged = this.state.players.get(id1);
    const challenger = this.state.players.get(id2);
    if (!challenged) return;
    if (!challenger) return;

    if (type !== "free") {
      challenged.matching = false;
      challenger.matching = false;
    }

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
      type,
    });
    const [a, b] = await Promise.all([
      matchMaker.joinById(room.roomId, {
        name: challenged.name,
        id: challenged.sessionID,
        accountID: challenged.accountID,
      }),
      matchMaker.joinById(room.roomId, {
        name: challenger.name,
        id: challenger.sessionID,
        accountID: challenger.accountID,
      }),
    ]);
    const client = this.clients.getById(id1);
    const client2 = this.clients.getById(id2);
    if (type !== "free") {
      client.send("remove-queue");
      client2.send("remove-queue");
    }
    client.send("battle", {
      seat: a,
      opponent: challenger.name,
      type,
      formatID,
      specatator: false,
    });
    client2.send("battle", {
      seat: b,
      opponent: challenged.name,
      type,
      formatID,
      spectator: false,
    });
  }

  onCancelQueue(playerID: string) {
    const player = this.state.players.get(playerID);
    if (!player) return;
    if (!player.matching) return;

    player.matching = false;
    const client = this.clients.getById(player.sessionID);

    if (!client) return;
    client.send("remove-queue");
  }
}
