import { Schema, type } from "@colyseus/schema";

import { Card } from "./Card";
import type { Player } from "./Player";
import type { Lane } from "./Lane";
import { SkillTag } from "./Skill";

export class PlayedCard extends Schema {
  player: Player;

  lane: Lane;

  @type("uint64")
  cardID: number;

  @type("int32")
  buffs: number;

  @type("boolean")
  baseBuster: boolean;

  @type("boolean")
  baseGuard: boolean;

  @type("boolean")
  stunned: boolean;

  @type("boolean")
  incapacitated: boolean;

  @type("uint64")
  unitedFront: number;

  position: number;

  constructor(player: Player, lane: Lane, position: number) {
    super();
    this.player = player;
    this.lane = lane;
    this.cardID = 0;
    this.buffs = 0;
    this.baseBuster = false;
    this.baseGuard = false;
    this.stunned = false;
    this.incapacitated = false;
    this.position = position;
    this.unitedFront = 0;
  }

  get cardIndex() {
    return this.position + this.lane.position * this.lane.cards.length;
  }

  get card() {
    return Card.COLLECTION[this.cardID];
  }

  get attack() {
    if (this.cardID == 0) return 0;
    if (this.stunned || this.incapacitated) return 0;

    let result = this.card.attack + this.buffs;
    if (this.card.includes("unitedFront")) {
      result += this.player.board.allies - 1;
    }
    return result;
  }

  includes(tag: SkillTag) {
    if (this.cardID === 0) return false;
    if (this.stunned || this.incapacitated) return false;

    return this.card.includes(tag);
  }
}
