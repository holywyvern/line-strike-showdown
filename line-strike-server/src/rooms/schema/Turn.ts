import { Schema, ArraySchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { Card } from "./Card";
import { PlayerBoard } from "./PlayerBoard";
import { PlayedCard } from "./PlayedCard";

export class TurnAction extends Schema {
  player: Player;

  @type("uint64")
  cardID: number;

  @type("uint8")
  position: number;

  @type("uint8")
  usedPP: number;

  oldSpot: PlayedCard;

  constructor(player: Player, id: number, position: number, usedPP: number, oldSpot: PlayedCard) {
    super();
    this.player = player;
    this.cardID = id;
    this.position = position;
    this.usedPP = usedPP;
    this.oldSpot = oldSpot;
  }

  get card() {
    return Card.COLLECTION[this.cardID];
  }

  get priority() {
    return this.card?.priority || 0;
  }
}

export class Turn extends PlayerBoard {
  @type("boolean")
  locked: boolean;

  @type(["uint64"])
  usedHand: ArraySchema<number>;

  @type("uint64")
  usedPP: number;

  @type([TurnAction])
  actions: ArraySchema<TurnAction>;

  constructor(player: Player) {
    super(player);
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
