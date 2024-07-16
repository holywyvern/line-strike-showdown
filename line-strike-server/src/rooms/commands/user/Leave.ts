import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";

export interface LeaveProps {
  client: Client;
}

export class Leave extends Command<LineStrikeRoom, LeaveProps> {
  async execute({ client }: LeaveProps) {
    const player = this.state.findPlayer(client);
    const spectator = this.state.spectators.get(client.sessionId);
    this.state.chat.push(
      new ChatLog({
        name: spectator?.name,
        playerID: spectator?.id,
        type: "leave",
      })
    );
    this.state.spectators.delete(client.sessionId);
    await this.room.updateMetaPlayers();
    if (!player) return;
    // TODO: Mark as win for abandonment
  }
}
