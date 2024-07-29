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

export class JoinReplay extends Command<LineStrikeRoom, JoinProps> {
  async execute({ client, options }: JoinProps) {
    this.state.spectators.set(
      client.sessionId,
      new Spectator(options.id, options.name)
    );
    await this.room.updateMetaPlayers();
  }
}
