import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";
import { PlayedCard } from "../../schema/PlayedCard";

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
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }
}
