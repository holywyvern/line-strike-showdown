import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";
import { PlayedCard } from "../../schema/PlayedCard";

export interface SwapCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class SwapCard extends Command<LineStrikeRoom, SwapCardsProps> {
  async execute({ player, reverse, card }: SwapCardsProps) {
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    const targets = reverse ? board.reversedCards : board.cards;
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }
}
