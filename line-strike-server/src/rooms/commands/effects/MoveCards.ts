import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";

import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";

import { PlayedCard } from "../../schema/PlayedCard";

export interface MoveCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class MoveCards extends Command<LineStrikeRoom, MoveCardsProps> {
  async execute({ player, reverse, card }: MoveCardsProps) {
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }
}
