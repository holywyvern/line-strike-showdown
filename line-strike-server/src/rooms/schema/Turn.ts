import { Schema, ArraySchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { Card } from "./Card";

export class TurnAction extends Schema {
  player: Player;

  @type("uint64")
  cardID: number;

  @type("uint8")
  position: number;

  @type("uint8")
  usedPP: number;

  constructor(player: Player, id: number, position: number, usedPP: number) {
    super();
    this.player = player;
    this.cardID = id;
    this.position = position;
    this.usedPP = usedPP;
  }

  get card() {
    return Card.COLLECTION[this.cardID];
  }

  get priority() {
    return this.card?.priority || 0;
  }
}

export class Turn extends Schema {
  player: Player;

  @type("boolean")
  locked: boolean;

  @type(["uint64"])
  usedHand: ArraySchema<number>;

  @type("uint64")
  usedPP: number;

  @type([TurnAction])
  actions: ArraySchema<TurnAction>;

  constructor(player: Player) {
    super();
    this.player = player;
    this.locked = false;
    this.usedPP = 0;
    this.usedHand = new ArraySchema();
    this.actions = new ArraySchema();
  }

  get remainingPP() {
    return this.player.pp - this.usedPP;
  }
}
