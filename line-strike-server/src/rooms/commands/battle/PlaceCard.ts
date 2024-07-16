import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Turn } from "../../schema/Turn";
import { PlayedCard } from "../../schema/PlayedCard";
import { Player } from "../../schema/Player";

export interface PlaceCardProps {
  player: Player;
  spot: PlayedCard;
  handIndex: number;
}

export class PlaceCard extends Command<LineStrikeRoom, PlaceCardProps> {
  async execute({ player, spot, handIndex }: PlaceCardProps) {
    spot.cardID = player.handIDs[handIndex];
    player.handIDs.deleteAt(handIndex);
    spot.buffs = 0;
    spot.baseBuster = spot.card.includes("baseBuster");
    spot.baseGuard = spot.card.includes("baseGuard");
    spot.stunned = false;
    spot.incapacitated = false;
    for (const card of player.board.cards) {
      card.unitedFront = player.board.allies - 1;
    }
  }
}
