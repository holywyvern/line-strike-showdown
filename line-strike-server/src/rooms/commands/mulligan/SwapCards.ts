import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { ChatLog } from "../../schema/ChatLog";

import { CheckAllSelected } from "./CheckAllSelected";
import { DrawFirstHandBack } from "./DrawFirstHandBack";

export interface SwapCardsPayload {
  client: Client;
}

export class SwapCards extends Command<LineStrikeRoom, SwapCardsPayload> {
  async execute({ client }: SwapCardsPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;
    if (player.selected) return;
    if (this.state.phase !== "firstDraw") return;

    player.selected = true;
    this.state.chat.push(
      new ChatLog({
        playerID: player.sessionID,
        name: player.name,
        type: "mulligan",
      })
    );
    return [
      new DrawFirstHandBack().setPayload({ player }),
      new CheckAllSelected(),
    ];
  }
}
