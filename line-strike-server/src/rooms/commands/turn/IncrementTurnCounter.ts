import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ChatLog } from "../../schema/ChatLog";

export class IncrementTurnCounter extends Command<LineStrikeRoom> {
  async execute() {
    this.state.turn++;
    this.state.phase = "planning";
    console.log(`Starting turn ${this.state.turn}`);
    this.state.chat.push(new ChatLog({ type: "turn", turn: this.state.turn }));
    this.state.delayed = this.clock.setTimeout(
      this.endPlanning,
      this.state.format.turnSeconds * 1_000
    );
  }

  endPlanning = () => {
    this.state.delayed = null;
    // TODO: Start turn actions
  };
}
