import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { UpdateELO } from "./UpdateELO";
import { UpdateMatchCount } from "./UpdateMatchCount";

export class RecordMatch extends Command<LineStrikeRoom> {
  async execute() {
    const { playerA, playerB } = this.state;
    if (this.state.rankType === "free") return;
    if (this.state.recorded) return;

    this.state.recorded = true;
    const actions: Command[] = [];
    if (this.state.rankType === "ranked") {
      actions.push(new UpdateELO());
    }
    if (playerA.accountID !== playerB.accountID) {
      actions.push(
        new UpdateMatchCount().setPayload({ player: playerA }),
        new UpdateMatchCount().setPayload({ player: playerB })
      );
    }

    return actions;
  }
}
