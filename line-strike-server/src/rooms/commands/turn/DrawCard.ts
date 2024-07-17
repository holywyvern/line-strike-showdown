import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { ChatLog } from "../../schema/ChatLog";

export interface DrawCardProps {
  player: Player;
}

export class DrawCard extends Command<LineStrikeRoom> {
  async execute({ player }: DrawCardProps) {
    if (player.deckIDs.length < 1) return;

    this.state.chat.push(
      new ChatLog({
        type: "drawCard",
        name: player.name,
        playerID: player.sessionID,
      })
    );

    player.handIDs.push(player.deckIDs.pop());
    player.handSize++;
    player.deckSize--;
  }
}
