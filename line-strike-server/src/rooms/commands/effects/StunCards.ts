import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";
import { PlayedCard } from "../../schema/PlayedCard";
import { ChatLog } from "../../schema/ChatLog";

export interface StunCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class StunCards extends Command<LineStrikeRoom, StunCardsProps> {
  async execute({ player, reverse, card }: StunCardsProps) {
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    const targets = reverse ? board.reversedCards : board.cards;
    for (let i = 0; i < targets.length; ++i) {
      if (card.card.area[i]) {
        targets[i].stunned = true;
        this.state.chat.push(
          new ChatLog({ type: "stun", position: i, cardID: card.cardID })
        );
        this.room.broadcast("animation", {
          playerID: target.sessionID,
          name: "stun",
          position: targets[i].realPosition,
        });
      }
    }
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }
}
