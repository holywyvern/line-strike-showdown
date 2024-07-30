import { Command } from "@colyseus/command";

import { LineStrikeRecordRoom } from "../../LineStrikeRecordRoom";
import { PlayAction } from "./PlayAction";
import { StartTurn } from "../turn/StartTurn";

export class Play extends Command<LineStrikeRecordRoom> {
  async execute() {
    if (!this.state.paused) return;
    if (!this.state.match) return;

    this.state.paused = false;
    return this.state.match.chats.map((chat) => {
      return new PlayAction().setPayload({ chat });
    });
  }
}
