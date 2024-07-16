import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { GainPP } from "../user/GainPP";

import { Card } from "../../schema/Card";
import { PlayedCard } from "../../schema/PlayedCard";
import { SaveAction } from "./SaveAction";

export interface PlayCardProps {
  client: Client;
  handIndex: number;
  position: number;
}

export class PlayCard extends Command<LineStrikeRoom, PlayCardProps> {
  async execute({ client, handIndex, position }: PlayCardProps) {
    const player = this.state.findPlayer(client);
    if (!player) return;
    const turn = player.turn;
    const cards = player.board.cards;
    const newCard = player.hand[handIndex];
    const spot = cards[position];
    if (player.turn.usedHand.includes(handIndex)) return;
    if (!newCard) return;
    if (!spot) return;

    const currentCard = spot.card;
    if (currentCard) {
      if (!newCard.canOverride(currentCard)) return;

      const pp = this.calculateOverridePpCost(spot, newCard, currentCard);
      if (turn.remainingPP < pp) return;

      return [
        new SaveAction().setPayload({ player, turn, spot, handIndex, pp }),
      ];
    }

    const pp = this.calculatePlacementPpCost(spot, newCard);
    if (turn.remainingPP < pp) return;

    return [new SaveAction().setPayload({ player, turn, spot, handIndex, pp })];
  }

  calculatePlacementPpCost(spot: PlayedCard, newCard: Card) {
    let cost = newCard.ppCost;
    return cost;
  }

  calculateOverridePpCost(spot: PlayedCard, newCard: Card, oldCard: Card) {
    let cost = newCard.ppCost - oldCard.ppCost;
    return cost;
  }
}
