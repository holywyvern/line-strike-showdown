import { Schema, ArraySchema, type } from "@colyseus/schema";

import type { Player } from "./Player";
import { Lane } from "./Lane";
import { PlayedCard } from "./PlayedCard";

export class PlayerBoard extends Schema {
  player: Player;

  @type([Lane])
  lanes: ArraySchema<Lane>;

  constructor(player: Player) {
    super();
    this.player = player;
    const format = this.format;
    this.lanes = new ArraySchema();
    while (this.lanes.length < format.lanes) {
      this.lanes.push(new Lane(player, this.lanes.length));
    }
  }

  get format() {
    return this.player.state.format;
  }

  get allies() {
    return this.lanes.reduce((i, l) => i + l.allies, 0);
  }

  get sortedLanes() {
    if (this.player.mirrored) {
      return [...this.lanes].reverse();
    }
    return [...this.lanes];
  }

  get cards() {
    const result = new Array(this.lanes.length * this.lanes[0].cards.length);
    for (let x = 0; x < this.lanes.length; ++x) {
      const lane = this.lanes[x];
      const size = lane.cards.length;
      for (let y = 0; y < size; ++y) {
        result[x + y * size] = lane.cards[y];
      }
    }
    return result as PlayedCard[];
  }

  get reversedCards() {
    return this.cards.reverse();
  }
}
