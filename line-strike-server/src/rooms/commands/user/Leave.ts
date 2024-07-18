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
    if (this.state.phase === "finished") return;

    await this.room.updateMetaPlayers();
    if (!player) return;

    if (this.state.delayed) {
      this.state.delayed.clear();
      this.state.delayed = null;
    }
    this.state.phase = "finished";

    const winner =
      this.state.playerA === player ? this.state.playerB : this.state.playerA;
    this.state.chat.push(
      new ChatLog({
        type: "win",
        playerID: winner.sessionID,
        name: winner.name,
      })
    );
  }
}
