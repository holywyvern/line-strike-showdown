import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ResetTurn } from "./ResetTurn";
import { IncrementTurnCounter } from "./IncrementTurnCounter";
import { GainPP } from "../user/GainPP";
import { ResetPlays } from "./ResetPlays";
import { DrawCard } from "./DrawCard";
import { Wait } from "../utils/Wait";
import { BroadcastStart } from "./BroadcastStart";
import { StartBattle } from "./StartBattle";

export interface StartTurnProps {
  draw?: boolean;
}

export class StartTurn extends Command<LineStrikeRoom, StartTurnProps> {
  async execute(props: StartTurnProps) {
    const { draw } = props || {};

    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    const messages: Command[] = [];
    if (!draw) {
      this.state.musicName = "phase1";
    }
    const format = this.state.format;
    const draws: Command[] = [];
    if (draw) {
      draws.push(
        new DrawCard().setPayload({ player: this.state.playerA }),
        new DrawCard().setPayload({ player: this.state.playerB })
      );
    }
    if (!draw) {
      messages.push(new StartBattle(), new BroadcastStart());
    }
    this.state.playerA.lastTurn.clear();
    this.state.playerB.lastTurn.clear();
    return [
      new ResetPlays().setPayload({ player: this.state.playerA }),
      new ResetPlays().setPayload({ player: this.state.playerB }),
      new ResetTurn().setPayload({ player: this.state.playerA }),
      new ResetTurn().setPayload({ player: this.state.playerB }),
      new Wait().setPayload({ time: 200 }),
      new GainPP().setPayload({
        player: this.state.playerA,
        pp: format.ppPerTurn,
      }),
      new GainPP().setPayload({
        player: this.state.playerB,
        pp: format.ppPerTurn,
      }),
      ...messages,
      new IncrementTurnCounter(),
      ...draws,
    ];
  }
}
