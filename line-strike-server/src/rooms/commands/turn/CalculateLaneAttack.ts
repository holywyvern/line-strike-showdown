import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { PlayerBoard } from "../../schema/PlayerBoard";

export interface CalculateLaneAttackProps {
  board: PlayerBoard;
}

export class CalculateLaneAttack extends Command<
  LineStrikeRoom,
  CalculateLaneAttackProps
> {
  async execute({ board }: CalculateLaneAttackProps) {
    for (const card of board.cards) {
      if (card.cardID > 0) {
        card.attack = Math.max(0, card.card.attack + card.buffs);
        if (card.attack < 1) {
          card.incapacitated = true;
        } else if (card.includes("unitedFront")) {
          card.attack += card.unitedFront;
        }
      } else {
        card.attack = 0;
      }
    }
    for (const lane of board.lanes) {
      lane.attack = lane.cards
        .filter((i) => i.canAct)
        .reduce((total, card) => total + card.attack, 0);
    }
  }
}