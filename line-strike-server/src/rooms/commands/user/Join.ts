import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";
import { Spectator } from "../../schema/Spectator";
import { Player } from "../../schema/Player";

export interface JoinProps {
  client: Client;
  options: any;
}

export class Join extends Command<LineStrikeRoom, JoinProps> {
  async execute({ client, options }: JoinProps) {
    this.state.spectators.set(
      client.sessionId,
      new Spectator(options.id, options.name)
    );
    await this.room.updateMetaPlayers();
    this.state.chat.push(
      new ChatLog({
        playerID: client.sessionId,
        name: options.name,
        type: "join",
      })
    );
    if (!this.state.playerA) {
      this.state.playerA = new Player(
        this.state,
        client,
        options.name,
        "",
        false,
        options.accountID
      );
      return;
    }
    if (!this.state.playerB) {
      this.state.playerB = new Player(
        this.state,
        client,
        options.name,
        "",
        true,
        options.accountID
      );
      await this.room.setPrivate(false);
    }
  }
}
