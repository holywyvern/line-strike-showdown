import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";

import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";

import { PlayedCard } from "../../schema/PlayedCard";
import { CardAreaDirection } from "../../schema/Card";
import { ChatLog } from "../../schema/ChatLog";

const { UP, DOWN, LEFT, RIGHT } = CardAreaDirection;

export interface MoveCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class MoveCards extends Command<LineStrikeRoom, MoveCardsProps> {
  async execute({ player, reverse, card }: MoveCardsProps) {
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    const targets = reverse ? board.reversedCards : board.cards;
    for (let i = 0; i < targets.length; ++i) {
      const direction = card.card.area[i];
      if (direction) {
        const j = this.getMovement(i, direction);
        if (targets[j].cardID === 0) {
          this.moveCard(targets, targets[i], targets[j]);
        }
        this.state.chat.push(
          new ChatLog({
            type: "move",
            cardID: card.cardID,
            position: i,
            newPosition: j,
          })
        );
      }
    }
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }

  moveCard(targets: PlayedCard[], from: PlayedCard, to: PlayedCard) {
    const copy = from.clone();
    from.buffs = 0;
    from.baseBuster = false;
    from.baseGuard = false;
    from.attack = 0;
    from.cardID = 0;
    from.incapacitated = false;
    from.stunned = false;
    from.justPlaced = false;
    from.unitedFront = 0;

    to.buffs = copy.buffs;
    to.baseBuster = copy.baseBuster;
    to.baseGuard = copy.baseGuard;
    to.attack = copy.attack;
    to.cardID = copy.cardID;
    to.incapacitated = copy.incapacitated;
    to.stunned = copy.stunned;
    to.justPlaced = copy.justPlaced;
    to.unitedFront = copy.unitedFront;
  }

  getMovement(index: number, direction: CardAreaDirection) {
    switch (direction) {
      case UP:
        return index - 3;
      case LEFT:
        return index - 1;
      case RIGHT:
        return index + 1;
      case DOWN:
        return index + 3;
    }
    return index;
  }
}
