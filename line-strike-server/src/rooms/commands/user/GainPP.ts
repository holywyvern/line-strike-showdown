import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { ChatLog } from "../../schema/ChatLog";

export interface GainPpPayload {
  player: Player;
  pp: number;
  log?: boolean;
}

export class GainPP extends Command<LineStrikeRoom, GainPpPayload> {
  async execute({ player, pp, log }: GainPpPayload) {
    const format = this.state.format;
    player.pp = Math.min(format.maxPP, Math.max(0, player.pp + pp));
    if (log) {
      this.state.chat.push(
        new ChatLog({
          type: "pp",
          playerID: player.sessionID,
          name: player.name,
        })
      );
    }
  }
}
