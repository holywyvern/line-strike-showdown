import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartTurn } from "../turn/StartTurn";

export class CheckAllSelected extends Command<LineStrikeRoom> {
  async execute() {
    if (this.state.players.every((i) => i.selected)) {
      return [new StartTurn()];
    }
  }
}
