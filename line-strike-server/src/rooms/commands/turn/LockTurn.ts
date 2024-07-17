import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartCombat } from "./StartCombat";
import { ChatLog } from "../../schema/ChatLog";

export interface LockTurnPayload {
  client: Client;
}

export class LockTurn extends Command<LineStrikeRoom, LockTurnPayload> {
  async execute({ client }: LockTurnPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;

    player.turn.locked = true;
    this.state.chat.push(
      new ChatLog({
        type: "lock",
        playerID: player.sessionID,
        name: player.name,
      })
    );
    if (this.state.players.every((i) => i.turn.locked)) {
      return [new StartCombat()];
    }
  }
}
