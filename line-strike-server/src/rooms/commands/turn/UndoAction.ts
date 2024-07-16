import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface UndoPayload {
  client: Client;
}

export class UndoAction extends Command<LineStrikeRoom, UndoPayload> {
  async execute({ client }: UndoPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;

    const turn = player.turn;
    if (turn.actions.length < 1) return;

    const action = turn.actions.pop();
    turn.usedHand.pop();
    turn.usedPP -= action.usedPP;
  }
}
