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
    if (this.state.replay) return;

    const specatator = this.state.spectators.get(client.sessionId);
    if (!specatator) return;

    if (message.length > 200) {
      message = message.slice(0, 200);
    }
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
