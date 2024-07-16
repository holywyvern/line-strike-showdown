import { Schema, ArraySchema, type } from "@colyseus/schema";

import type { Player } from "./Player";
import { Lane } from "./Lane";

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
      this.lanes.push(new Lane(player));
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
    const result = [];
    for (const lane of this.lanes) {
      for (const card of lane.cards) {
        result.push(card);
      }
    }
    return result;
  }
}
