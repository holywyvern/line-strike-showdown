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
  ppUsed: number;

  constructor(player: Player, id: number, position: number, ppUsed: number) {
    super();
    this.player = player;
    this.cardID = id;
    this.position = position;
    this.ppUsed = ppUsed;
  }

  get card() {
    return Card.COLLECTION[this.cardID]
  }

  get priority() {
    return this.card?.priority || 0;
  }
}

export class Turn extends Schema {
  player: Player;

  @type("boolean")
  locked: boolean;

  @type("number")
  usedPP: number;

  @type(["uint64"])
  usedHand: number[];

  @type([TurnAction])
  actions: ArraySchema<TurnAction>;

  constructor(player: Player) {
    super();
    this.player = player;
  }

  get remainingPP() {
    return this.player.pp - this.usedPP;
  }
}