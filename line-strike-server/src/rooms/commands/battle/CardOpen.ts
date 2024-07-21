import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";

export class CardOpen extends Command<LineStrikeRoom> {
  async execute() {
    this.room.broadcast("card-open");
  }
}
