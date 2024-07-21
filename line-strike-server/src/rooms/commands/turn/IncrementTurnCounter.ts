import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ChatLog } from "../../schema/ChatLog";
import { StartCombat } from "./StartCombat";
import { Delayed } from "colyseus";
import { Wait } from "../utils/Wait";

export class IncrementTurnCounter extends Command<LineStrikeRoom> {
  delayed: Delayed;

  async execute() {
    this.state.turn++;
    this.state.phase = "planning";
    this.state.chat.push(new ChatLog({ type: "turn", turn: this.state.turn }));
    this.state.delayed = this.clock.setTimeout(
      this.endPlanning,
      this.state.format.turnSeconds * 1_000
    );
    this.state.turnTimestamp = Date.now();
    this.state.turnTimeLeft = (1 + this.state.format.turnSeconds) * 1_000;
    if (this.state.turn !== 1) {
      this.room.broadcast("start-turn", { turn: this.state.turn });
    }
    return [new Wait().setPayload({ time: 3_500 })];
  }

  endPlanning = () => {
    if (this.delayed) {
      this.delayed.clear();
    }
    this.room.dispatcher.safeDispatch(new StartCombat());
  };
}
