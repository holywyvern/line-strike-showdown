import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";
import { PlayedCard } from "../../schema/PlayedCard";
import { CardAreaDirection } from "../../schema/Card";
import { ChatLog } from "../../schema/ChatLog";

const { UP, DOWN, LEFT, RIGHT } = CardAreaDirection;

export interface SwapCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class SwapCard extends Command<LineStrikeRoom, SwapCardsProps> {
  async execute({ player, reverse, card }: SwapCardsProps) {
    const data = card.card;
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    const targets = reverse ? board.reversedCards : board.cards;
    for (let i = 0; i < targets.length; ++i) {
      const direction = data.area[i];
      if (direction) {
        const j = this.getMovement(i, direction);
        this.swapCard(target, targets[i], targets[j]);
        const d = reverse ? 10 - direction : direction;
        this.room.broadcast("animation", {
          playerID: target.sessionID,
          name: "move",
          position: targets[i].realPosition,
          direction: d,
        });
        this.room.broadcast("animation", {
          playerID: target.sessionID,
          name: "move",
          position: targets[j].realPosition,
          direction: 10 - d,
        });
        this.state.chat.push(
          new ChatLog({
            type: "swap",
            cardID: card.cardID,
            position: targets[i].realPosition,
            newPosition: targets[j].realPosition,
          })
        );
      }
    }
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }

  swapCard(player: Player, from: PlayedCard, to: PlayedCard) {
    const copy = from.clone();
    from.buffs = to.buffs;
    from.baseBuster = to.baseBuster;
    from.baseGuard = to.baseGuard;
    from.attack = to.attack;
    from.cardID = to.cardID;
    from.incapacitated = to.incapacitated;
    from.stunned = to.stunned;
    from.justPlaced = to.justPlaced;
    from.unitedFront = to.unitedFront;

    to.buffs = copy.buffs;
    to.baseBuster = copy.baseBuster;
    to.baseGuard = copy.baseGuard;
    to.attack = copy.attack;
    to.cardID = copy.cardID;
    to.incapacitated = copy.incapacitated;
    to.stunned = copy.stunned;
    to.justPlaced = copy.justPlaced;
    to.unitedFront = copy.unitedFront;
    for (const action of player.lastTurn) {
      if (action.spot === to) {
        action.position = from.cardIndex;
      } else if (action.spot === from) {
        action.position = to.cardIndex;
      }
    }
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
