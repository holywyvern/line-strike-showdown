import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ChatLog } from "../../schema/ChatLog";
import { StartCombat } from "./StartCombat";

export class IncrementTurnCounter extends Command<LineStrikeRoom> {
  async execute() {
    this.state.turn++;
    this.state.phase = "planning";
    this.state.chat.push(new ChatLog({ type: "turn", turn: this.state.turn }));
    this.state.delayed = this.clock.setTimeout(
      this.endPlanning,
      this.state.format.turnSeconds * 1_000
    );
    this.state.turnTimeLeft = this.state.format.turnSeconds;
    this.state.delayed = this.clock.setInterval(() => {
      this.state.turnTimeLeft--;
      if (this.state.turnTimeLeft <= 0) {
        this.room.dispatcher.safeDispatch(new StartCombat());
      }
    }, 1_000);
  }

  endPlanning = () => {
    this.state.delayed = null;
    // TODO: Start turn actions
  };
}
