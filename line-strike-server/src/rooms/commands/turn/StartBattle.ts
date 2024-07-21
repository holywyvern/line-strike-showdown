import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Wait } from "../utils/Wait";

export class StartBattle extends Command<LineStrikeRoom> {
  async execute() {
    this.state.phase = "start";
    return [new Wait().setPayload({ time: 500 })];
  }
}
