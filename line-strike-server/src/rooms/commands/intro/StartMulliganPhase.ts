import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { SetupMulliganTimeout } from "./SetupMulliganTimeout";
import { DrawFirstHand } from "./DrawFirstHand";
import { ShuffleDeck } from "./ShuffleDeck";

export class StartMulliganPhase extends Command<LineStrikeRoom> {
  async execute() {
    this.state.phase = "firstDraw";
    for (const player of this.state.players) {
      player.selected = false;
    }
    return [
      new ShuffleDeck().setPayload({ player: this.state.playerA }),
      new ShuffleDeck().setPayload({ player: this.state.playerB }),
      new DrawFirstHand().setPayload({ player: this.state.playerA }),
      new DrawFirstHand().setPayload({ player: this.state.playerB }),
      new SetupMulliganTimeout(),
    ];
  }
}
