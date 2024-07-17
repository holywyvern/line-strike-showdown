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

  @type("boolean")
  baseBuster: boolean;

  @type("uint32")
  buffs: number;

  @type("boolean")
  baseGuard: boolean;

  @type("boolean")
  stunned: boolean;

  @type("boolean")
  incapacitated: boolean;

  @type("uint64")
  unitedFront: number;

  @type("uint8")
  position: number;

  @type("uint32")
  attack: number;

  constructor(player: Player, lane: Lane, position: number) {
    super();
    this.player = player;
    this.lane = lane;
    this.cardID = 0;
    this.attack = 0;
    this.buffs = 0;
    this.baseBuster = false;
    this.baseGuard = false;
    this.stunned = false;
    this.incapacitated = false;
    this.position = position;
    this.unitedFront = 0;
  }

  get cardIndex() {
    return this.position * this.lane.cards.length + this.lane.position;
  }

  get canAct() {
    if (this.stunned || this.incapacitated) return false;
    return this.attack > 0;
  }

  get card() {
    return Card.COLLECTION[this.cardID];
  }

  includes(tag: SkillTag) {
    if (this.cardID === 0) return false;
    if (this.stunned || this.incapacitated) return false;

    return this.card.includes(tag);
  }
}
