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

  constructor(player: Player) {
    super();
    this.player = player;
    const format = this.format;
    this.hp = format.laneHP;
    this.cards = new ArraySchema();
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
    return this.cards.length;
  }

  get attack() {
    return this.cards.reduce((i, c) => i + c.attack, 0);
  }

  get attackCount() {
    return this.cards.filter((i) => i.attack > 0).length;
  }

  includes(tag: SkillTag) {
    return this.cards.some((i) => i.includes(tag));
  }
}
