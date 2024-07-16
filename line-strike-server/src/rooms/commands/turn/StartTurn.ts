import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ResetTurn } from "./ResetTurn";
import { IncrementTurnCounter } from "./IncrementTurnCounter";
import { GainPP } from "../user/GainPP";

export class StartTurn extends Command<LineStrikeRoom> {
  async execute() {
    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    const format = this.state.format;
    return [
      new ResetTurn().setPayload({ player: this.state.playerA }),
      new ResetTurn().setPayload({ player: this.state.playerB }),
      new GainPP().setPayload({
        player: this.state.playerA,
        pp: format.ppPerTurn,
      }),
      new GainPP().setPayload({
        player: this.state.playerB,
        pp: format.ppPerTurn,
      }),
      new IncrementTurnCounter(),
    ];
  }
}
