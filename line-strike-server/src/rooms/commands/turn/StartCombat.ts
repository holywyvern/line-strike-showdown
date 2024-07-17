import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";
import { PerformActions } from "../battle/PerformActions";
import { ActivateSupports } from "../battle/ActivateSupports";
import { ActivateDisrupts } from "../battle/ActivateDisrupts";
import { PerformAttacks } from "../battle/PerformAttacks";
import { CheckVictory } from "../battle/CheckVictory";

export class StartCombat extends Command<LineStrikeRoom> {
  async execute() {
    this.state.phase = "battle";
    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    this.state.chat.push(new ChatLog({ type: "battleStart" }));
    return [
      new PerformActions().setPayload({ player: this.state.playerA }),
      new PerformActions().setPayload({ player: this.state.playerB }),
      new ActivateSupports().setPayload({ player: this.state.playerA }),
      new ActivateSupports().setPayload({ player: this.state.playerB }),
      new ActivateDisrupts().setPayload({ player: this.state.playerA }),
      new ActivateDisrupts().setPayload({ player: this.state.playerB }),
      new PerformAttacks(),
      new CheckVictory(),
    ];
  }
}