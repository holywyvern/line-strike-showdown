import { Command } from "@colyseus/command";

import { LineStrikeRecordRoom } from "../../LineStrikeRecordRoom";

export class Pause extends Command<LineStrikeRecordRoom> {
  async execute() {
    if (this.state.paused) return;
  }
}
