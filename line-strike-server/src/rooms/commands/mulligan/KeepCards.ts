import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartTurn } from "../turn/StartTurn";
import { ChatLog } from "../../schema/ChatLog";
import { CheckAllSelected } from "./CheckAllSelected";

export interface KeepCardsPayload {
  client: Client;
}

export class KeepCards extends Command<LineStrikeRoom, KeepCardsPayload> {
  async execute({ client }: KeepCardsPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;
    if (player.selected) return;
    if (this.state.phase !== "firstDraw") return;

    player.selected = true;
    this.state.chat.push(
      new ChatLog({
        type: "keep",
        playerID: player.sessionID,
        name: player.name,
      })
    );
    return [new CheckAllSelected()];
  }
}
