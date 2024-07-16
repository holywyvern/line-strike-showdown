import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ResetTurn } from "./ResetTurn";

export class StartTurn extends Command<LineStrikeRoom> {
  async execute() {
    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    return [
      new ResetTurn().setPayload({ player: this.state.playerA }),
      new ResetTurn().setPayload({ player: this.state.playerB }),
    ];
  }
}
