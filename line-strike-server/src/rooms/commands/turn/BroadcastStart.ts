import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Wait } from "../utils/Wait";

export class BroadcastStart extends Command<LineStrikeRoom> {
  async execute() {
    this.room.broadcast("battle-start");
    return [new Wait().setPayload({ time: 3_500 })];
  }
}
