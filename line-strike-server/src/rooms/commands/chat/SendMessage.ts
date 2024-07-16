import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";

export interface SendMessagePayload {
  client: Client;
  message: string;
}

export class SendMessage extends Command<LineStrikeRoom, SendMessagePayload> {
  async execute({ client, message }: SendMessagePayload) {
    const specatator = this.state.spectators.get(client.sessionId);
    if (!specatator) return;

    this.state.chat.push(
      new ChatLog({
        playerID: specatator.id,
        name: specatator.name,
        message,
        type: "chat",
      })
    );
  }
}
