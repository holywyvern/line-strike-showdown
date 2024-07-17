import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

export class StartCombat extends Command<LineStrikeRoom> {
  async execute() {
    this.state.phase = "battle";
    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
  }
}
