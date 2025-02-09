import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Card } from "../../schema/Card";
import { PlayedCard } from "../../schema/PlayedCard";
import { SaveAction } from "./SaveAction";
import { PlaceCard } from "../battle/PlaceCard";
import { CalculateUnitedFront } from "./CalculateUnitedFront";
import { CalculateLaneAttack } from "./CalculateLaneAttack";
import { Player } from "../../schema/Player";

export type PlayPlayerCardProps = {
  player: Player;
  handIndex: number;
  position: number;
};

export class PlayPlayerCard extends Command<
  LineStrikeRoom,
  PlayPlayerCardProps
> {
  async execute({ player, handIndex, position }: PlayPlayerCardProps) {
    const turn = player.turn;
    const cards = player.turn.cards;
    const newCard = player.hand[handIndex];
    const spot = cards[position];
    if (turn.locked) throw new Error("Can't play card on locked turn");
    if (player.turn.usedHand.includes(handIndex))
      throw new Error("Card already played this turn.");
    if (!newCard) throw new Error("Card not found");
    if (!spot) throw new Error("Bad position for play");
    if (spot.justPlaced)
      throw new Error("Can't override a card on its first turn");

    const currentCard = spot.card;
    if (currentCard) {
      if (!newCard.canOverride(currentCard, spot.incapacitated))
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
          placeIndex: player.turn.actions.length,
        }),
        new CalculateUnitedFront().setPayload({ board: turn }),
        new CalculateLaneAttack().setPayload({ board: turn }),
      ];
    }

    const pp = this.calculatePlacementPpCost(spot, newCard);
    if (turn.remainingPP < pp) throw new Error("Unable to place card");

    return [
      new SaveAction().setPayload({ player, turn, spot, handIndex, pp }),
      new PlaceCard().setPayload({
        player,
        board: player.turn,
        handIndex,
        position,
        placeIndex: player.turn.actions.length,
      }),
    ];
  }

  calculatePlacementPpCost(spot: PlayedCard, newCard: Card) {
    let cost = newCard.ppCost;
    if (newCard.includes("reinforcement") && this.isReinforced(spot, newCard)) {
      cost -= 1;
    }
    return cost;
  }

  calculateOverridePpCost(spot: PlayedCard, newCard: Card, oldCard: Card) {
    let cost = newCard.ppCost - oldCard.ppCost;
    if (newCard.includes("reinforcement") && this.isReinforced(spot, newCard)) {
      cost -= 1;
    }
    return cost;
  }

  isReinforced(spot: PlayedCard, card: Card) {
    const lane = spot.lane;
    const rival =
      spot.player === this.state.playerA
        ? this.state.playerB
        : this.state.playerA;
    const enemyLanes = [...rival.board.lanes].reverse();
    const rivalLane = enemyLanes[lane.position];
    return rivalLane.attack > lane.attack;
  }
}
