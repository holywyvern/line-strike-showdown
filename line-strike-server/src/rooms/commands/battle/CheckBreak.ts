import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Lane } from "../../schema/Lane";
import { SendBreak } from "./SendBreak";
import { ChatLog } from "../../schema/ChatLog";
import { Wait } from "../utils/Wait";

export interface CheckBreakProps {
  attacker: Lane;
  defender: Lane;
  index: number;
}

export class CheckBreak extends Command<LineStrikeRoom, CheckBreakProps> {
  async execute({ attacker, defender, index }: CheckBreakProps) {
    if (!defender.broken) return;

    this.state.musicName = "phase2";
    attacker.victory = true;

    this.state.chat.push(
      new ChatLog({
        type: "break",
        playerID: attacker.player.sessionID,
        name: attacker.player.name,
        lane: index,
      })
    );
    return [
      new SendBreak().setPayload({ playerID: defender.player.sessionID }),
      new Wait().setPayload({ time: 3_500 }),
    ];
  }
}
