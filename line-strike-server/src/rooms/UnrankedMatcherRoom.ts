import { Client, ClientArray, matchMaker, Room } from "colyseus";
import { SECRET_LOBBY_KEY } from "../utils/keys";
import { IncomingMessage } from "http";
import { LobbyRoom } from "./LobbyRoom";
import { Format } from "./schema/Format";

interface MatchingPlayer {
  name: string;
  playerID: string;
}

export class UnrankedMatcherRoom extends Room {
  players: Map<string, MatchingPlayer>;
  format: Format;

  async onCreate(options: any) {
    this.players = new Map();
    if (options?.__secret_lobby_key__ !== SECRET_LOBBY_KEY) {
      throw new Error("Failed to create lobby, missing key!");
    }
    this.format = Format.COLLECTION[options?.formatID];
    if (!this.format) throw new Error("Failed to select format");
  }

  onAuth(_client: Client, options: any) {
    if (!options?.name) throw new Error("Missing Player name");
    if (!options?.playerID) throw new Error("Missing Player ID");

    return true;
  }

  async onJoin(client: Client, options: any) {
    const { name, playerID } = options;
    this.players.set(client.sessionId, { name, playerID });
    if (this.players.size > 1) {
      await this.matchMake();
    }
  }

  async onLeave(client: Client) {
    if (!this.players.has(client.sessionId)) return;

    const player = this.players.get(client.sessionId);
    this.players.delete(client.sessionId);
    await matchMaker.remoteRoomCall(
      LobbyRoom.instance.roomId,
      "onCancelQueue",
      [player.playerID]
    );
  }

  async matchMake() {
    const [key1, key2] = this.players.keys();
    const playerA = this.players.get(key1);
    const playerB = this.players.get(key2);
    if (!playerA || !playerB) return;

    this.players.delete(key1);
    this.players.delete(key2);
    await matchMaker.remoteRoomCall(
      LobbyRoom.instance.roomId,
      "onMatchmakeFound",
      [playerA.playerID, playerB.playerID, this.format.id, "unranked"]
    );
  }
}
