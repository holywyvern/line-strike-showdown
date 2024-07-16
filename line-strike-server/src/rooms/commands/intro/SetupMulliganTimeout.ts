import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartTurn } from "../turn/StartTurn";

export class SetupMulliganTimeout extends Command<LineStrikeRoom> {
  async execute() {
    this.state.delayed = this.clock.setTimeout(
      this.cancelMulligans,
      this.state.format.mulliganSeconds * 1_000
    );
  }

  cancelMulligans = () => {
    this.state.delayed = null;
    return this.room.dispatcher.safeDispatch(new StartTurn());
  };
}
