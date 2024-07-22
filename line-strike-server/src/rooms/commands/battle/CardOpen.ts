import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Wait } from "../utils/Wait";

export class CardOpen extends Command<LineStrikeRoom> {
  async execute() {
    this.room.broadcast("card-open");
    return [new Wait().setPayload({ time: 3_000 })];
  }
}
