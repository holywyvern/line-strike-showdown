import { Client, matchMaker, Room } from "colyseus";
import { AccountELO } from "@prisma/client";

import { differenceInMinutes } from "date-fns";

import { Format } from "./schema/Format";

import { SECRET_LOBBY_KEY } from "../utils/keys";
import { database } from "../database";
import { LobbyRoom } from "./LobbyRoom";

const ELO_THRESHOLD = 300;

interface MatchingPlayer {
  name: string;
  playerID: string;
  accountID: string;
  sessionID: string;
  elo: AccountELO;
  since: Date;
}

export class RankedMatcherRoom extends Room {
  players: Map<string, MatchingPlayer>;
  format: Format;

  isDev = process.env.NODE_ENV !== "production";

  async onCreate(options: any) {
    this.players = new Map();
    if (options?.__secret_lobby_key__ !== SECRET_LOBBY_KEY) {
      throw new Error("Failed to create lobby, missing key!");
    }
    this.format = Format.COLLECTION[options?.formatID];
    if (!this.format) throw new Error("Failed to select format");

    this.clock.setInterval(this.findMatches, 5_000);
    this.clock.start();
  }

  onAuth(_client: Client, options: any) {
    if (!options?.name) throw new Error("Missing Player name");
    if (!options?.playerID) throw new Error("Missing Player ID");
    if (!options?.accountID) throw new Error("Missing Account ID");

    return this.findELO(String(options.accountID));
  }

  async findELO(accountID: string) {
    const id = BigInt(accountID);
    await database.account.findUniqueOrThrow({
      where: { id },
    });
    let elo = await database.accountELO.findFirst({
      where: { accountID: id, formatID: this.format.id },
    });
    if (!elo) {
      elo = await database.accountELO.create({
        data: { accountID: id, formatID: this.format.id },
      });
    }
    return elo;
  }

  async onJoin(client: Client, options: any, elo: AccountELO) {
    const { name, playerID, accountID } = options;
    this.players.set(client.sessionId, {
      name,
      playerID,
      accountID,
      sessionID: client.sessionId,
      elo,
      since: new Date(),
    });
    if (this.isDev) console.log(`${name} is trying to do ranked matchmaking`);
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
    if (this.isDev) console.log(`${player.name} is leaving ranked matchmaking`);
  }

  findMatches = async () => {
    if (this.isDev) console.log("Attempting matchmake...");
    if (this.players.size < 2) return;

    if (this.isDev) console.log("Sorting by queue time...");
    const orderedByNewest = [...this.players.values()].sort(
      (a, b) => a.since.getTime() - b.since.getTime()
    );
    if (this.isDev)
      console.log(`Trying to matchmake ${orderedByNewest.length} players...`);
    while (orderedByNewest.length >= 2) {
      const oldest = orderedByNewest.pop();
      await this.findPair(oldest, orderedByNewest);
    }
  };

  async findPair(player: MatchingPlayer, remaining: MatchingPlayer[]) {
    if (this.isDev) console.log(`Trying to find a match for ${player.name}...`);
    for (let i = 0; i < remaining.length; ++i) {
      const rival = remaining[i];
      const matched = this.isCloseEnough(player, rival);
      if (this.isDev)
        console.log("Players matching...", matched, rival.name, player.name);
      if (matched) {
        remaining.splice(i, 1);
        return this.prepareBattle(player, rival);
      }
    }
  }

  isCloseEnough(a: MatchingPlayer, b: MatchingPlayer) {
    if (a.accountID === b.accountID) return false;
    if (a.elo.matches < 10 && b.elo.matches < 10) return true;

    const now = new Date();
    const diffA = Math.abs(differenceInMinutes(a.since, now));
    const diffB = Math.abs(differenceInMinutes(b.since, now));
    if (diffA > 5 && diffB > 5) {
      return true;
    }
    const elo = Math.abs(a.elo.value - b.elo.value);
    return elo <= ELO_THRESHOLD;
  }

  async prepareBattle(playerA: MatchingPlayer, playerB: MatchingPlayer) {
    this.players.delete(playerA.sessionID);
    this.players.delete(playerB.sessionID);
    const clients = [
      this.clients.getById(playerA.sessionID),
      this.clients.getById(playerB.sessionID),
    ].filter(Boolean);
    for (const client of clients) {
      client.leave();
    }
    await matchMaker.remoteRoomCall(
      LobbyRoom.instance.roomId,
      "onMatchmakeFound",
      [playerA.playerID, playerB.playerID, this.format.id, "ranked"]
    );
  }
}
