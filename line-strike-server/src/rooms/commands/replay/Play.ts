import { Command } from "@colyseus/command";

import { LineStrikeRecordRoom } from "../../LineStrikeRecordRoom";

export class Play extends Command<LineStrikeRecordRoom> {
  async execute() {
    if (!this.state.paused) return;

    this.state.paused = false;
  }
}
