import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface RefreshTurnProps {
  player: Player;
}

export class RefreshTurn extends Command<LineStrikeRoom, RefreshTurnProps> {
  async execute({ player }: RefreshTurnProps) {
    const laneCount = player.board.lanes.length;
    for (let i = 0; i < laneCount; ++i) {
      const lane = player.board.lanes[i];
      const turnLane = player.turn.lanes[i];
      turnLane.hp = lane.hp;
      turnLane.victory = lane.victory;
      const cardCount = player.board.cards.length;
      for (let j = 0; j < cardCount; ++j) {
        const card = player.board.cards[j];
        const turnCard = player.turn.cards[j];
        turnCard.baseGuard = card.baseBuster;
        turnCard.baseGuard = card.baseGuard;
        turnCard.attack = card.attack;
        turnCard.cardID = card.cardID;
        turnCard.incapacitated = card.incapacitated;
        turnCard.stunned = card.stunned;
      }
    }
  }
}
