import { Schema, ArraySchema, type } from "@colyseus/schema";

import { PlayedCard } from "./PlayedCard";
import { Player } from "./Player";
import { SkillTag } from "./Skill";

export class Lane extends Schema {
  player: Player;

  @type([PlayedCard])
  cards: ArraySchema<PlayedCard>;

  @type("uint8")
  hp: number;

  @type("uint8")
  maxHp: number;

  @type("uint8")
  position: number;

  @type("uint32")
  attack: number;

  victory: boolean;

  constructor(player: Player, position: number) {
    super();
    this.player = player;
    this.position = position;
    const format = this.format;
    this.hp = format.laneHP;
    this.maxHp = format.laneHP;
    this.cards = new ArraySchema();
    this.attack = 0;
    this.victory = false;
    while (this.cards.length < format.laneLength) {
      this.cards.push(new PlayedCard(player, this, this.cards.length));
    }
  }

  get format() {
    return this.player.state.format;
  }

  get broken() {
    return this.hp < 1;
  }

  get allies() {
    return this.cards.filter((i) => i.cardID > 0).length;
  }

  get activeCards() {
    return this.cards.filter((i) => i.canAct);
  }

  includes(tag: SkillTag) {
    return this.cards.some((i) => i.includes(tag));
  }
}
