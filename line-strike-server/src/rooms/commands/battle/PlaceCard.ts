import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { PlayerBoard } from "../../schema/PlayerBoard";

export interface PlaceCardProps {
  player: Player;
  board: PlayerBoard;
  handIndex: number;
  position: number;
}

export class PlaceCard extends Command<LineStrikeRoom, PlaceCardProps> {
  async execute({ player, board, handIndex, position }: PlaceCardProps) {
    const spot = board.cards[position];
    if (!spot) return;

    spot.cardID = player.handIDs[handIndex];
    spot.buffs = 0;
    spot.baseBuster = spot.card.includes("baseBuster");
    spot.baseGuard = spot.card.includes("baseGuard");
    spot.stunned = false;
    spot.incapacitated = false;
    for (const card of board.cards) {
      card.unitedFront = board.allies - 1;
    }
  }
}
