import { Client, ServerError } from "colyseus";
import { StatusCodes } from "http-status-codes";

import { LineStrikeRoom } from "./LineStrikeRoom";

import { JoinReplay } from "./commands/user/JoinReplay";

import { database } from "../database";
import { Play } from "./commands/replay/Play";
import { Pause } from "./commands/replay/Pause";
import { MatchRecordPlayer } from "@prisma/client";
import { Player } from "./schema/Player";

export class LineStrikeRecordRoom extends LineStrikeRoom {
  async onCreate(options: any) {
    await super.onCreate(options);
    if (typeof options.matchID !== "string") {
      throw new ServerError(StatusCodes.NOT_FOUND, "Match not found");
    }
    this.state.match = await database.matchRecord.findUniqueOrThrow({
      where: { id: BigInt(options.matchID) },
      include: { playerA: true, playerB: true, chats: true },
    });
    const [a, b] = options.invert
      ? [this.state.match.playerB, this.state.match.playerA]
      : [this.state.match.playerA, this.state.match.playerB];
    this.state.playerA = this.createPlayer(
      a,
      true,
      this.state.match.accountAID
    );
    this.state.playerB = this.createPlayer(
      b,
      false,
      this.state.match.accountBID
    );
    this.state.rankType = "replay";
    this.state.recorded = true;
    this.state.replay = true;
    this.state.paused = true;
    this.state.phase = "planning";
    this.onMessage("play", this.onPlay);
    this.onMessage("pause", this.onPause);
  }

  createPlayer(data: MatchRecordPlayer, mirrored: boolean, id?: bigint) {
    const player = new Player(
      this.state,
      null,
      data.name,
      "",
      mirrored,
      id ? String(id) : null
    );
    player.sessionID = data.sessionID;
    player.handIDs.push(...data.startingHandIDs);
    player.deckIDs.push(...data.startingDeckIDs);
    return player;
  }

  async onJoin(client: Client, options: any) {
    await this.dispatcher.safeDispatch(new JoinReplay(), { client, options });
  }

  onPlay = async () => {
    await this.dispatcher.safeDispatch(new Play());
  };

  onPause = async () => {
    await this.dispatcher.safeDispatch(new Pause());
  };
}
