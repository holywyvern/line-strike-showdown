import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartTurn } from "../turn/StartTurn";

export class CheckVictory extends Command<LineStrikeRoom> {
  async execute() {
    return [new StartTurn().setPayload({ draw: true })];
  }
}
