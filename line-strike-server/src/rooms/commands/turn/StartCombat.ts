import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";
import { PerformActions } from "../battle/PerformActions";
import { ActivateSupports } from "../battle/ActivateSupports";
import { ActivateDisrupts } from "../battle/ActivateDisrupts";
import { PerformAttacks } from "../battle/PerformAttacks";
import { CheckVictory } from "../battle/CheckVictory";
import { Wait } from "../utils/Wait";
import { CardOpen } from "../battle/CardOpen";
import { WaitForPromise } from "../utils/WaitForPromise";
import { WaitForCallback } from "../utils/WaitForCallback";

export class StartCombat extends Command<LineStrikeRoom> {
  async execute() {
    this.state.phase = "battle";
    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    this.state.turnTimeLeft = 0;
    this.state.chat.push(new ChatLog({ type: "battleStart" }));

    const callback = () =>
      Promise.all([
        this.room.dispatcher.dispatch(new PerformActions(), {
          player: this.state.playerA,
        }),
        this.room.dispatcher.dispatch(new PerformActions(), {
          player: this.state.playerB,
        }),
      ]);
    return [
      new Wait().setPayload({ time: 500 }),
      new CardOpen(),
      new Wait().setPayload({ time: 3_000 }),
      new WaitForCallback().setPayload({ callback }),
      new ActivateSupports().setPayload({ player: this.state.playerA }),
      new ActivateSupports().setPayload({ player: this.state.playerB }),
      new ActivateDisrupts().setPayload({ player: this.state.playerA }),
      new ActivateDisrupts().setPayload({ player: this.state.playerB }),
      new PerformAttacks(),
      new CheckVictory(),
    ];
  }
}
