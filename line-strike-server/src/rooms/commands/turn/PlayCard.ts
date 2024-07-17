import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { GainPP } from "../user/GainPP";

import { Card } from "../../schema/Card";
import { PlayedCard } from "../../schema/PlayedCard";
import { SaveAction } from "./SaveAction";
import { PlaceCard } from "../battle/PlaceCard";

export interface PlayCardProps {
  client: Client;
  handIndex: number;
  position: number;
}

export class PlayCard extends Command<LineStrikeRoom, PlayCardProps> {
  async execute({ client, handIndex, position }: PlayCardProps) {
    const player = this.state.findPlayer(client);
    if (!player) throw new Error("Player not found");
    const turn = player.turn;
    const cards = player.board.cards;
    const newCard = player.hand[handIndex];
    const spot = cards[position];
    if (player.turn.usedHand.includes(handIndex))
      throw new Error("Card already played this turn.");
    if (!newCard) throw new Error("Card not found");
    if (!spot) throw new Error("Bad position for play");

    const currentCard = spot.card;
    if (currentCard) {
      if (!newCard.canOverride(currentCard))
        throw new Error("Unable to override card");

      const pp = this.calculateOverridePpCost(spot, newCard, currentCard);
      if (turn.remainingPP < pp) return;

      return [
        new SaveAction().setPayload({ player, turn, spot, handIndex, pp }),
        new PlaceCard().setPayload({
          player,
          board: player.turn,
          handIndex,
          position,
        }),
      ];
    }

    const pp = this.calculatePlacementPpCost(spot, newCard);
    console.log(pp, turn.remainingPP);
    if (turn.remainingPP < pp) throw new Error("Unable to place card");

    return [
      new SaveAction().setPayload({ player, turn, spot, handIndex, pp }),
      new PlaceCard().setPayload({
        player,
        board: player.turn,
        handIndex,
        position,
      }),
    ];
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
