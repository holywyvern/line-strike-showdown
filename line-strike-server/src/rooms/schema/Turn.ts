import { Schema, ArraySchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { Card } from "./Card";
import { PlayerBoard } from "./PlayerBoard";
import { PlayedCard } from "./PlayedCard";

export class TurnAction extends Schema {
  player: Player;

  @type("uint64")
  handIndex: number;

  @type("uint8")
  position: number;

  @type("uint8")
  usedPP: number;

  cardID: number;

  oldSpot: PlayedCard;

  turnIndex: number;

  constructor(
    player: Player,
    handIndex: number,
    position: number,
    usedPP: number,
    oldSpot: PlayedCard,
    turnIndex: number
  ) {
    super();
    this.player = player;
    this.handIndex = handIndex;
    this.cardID = player.handIDs[handIndex] || 0;
    this.position = position;
    this.usedPP = usedPP;
    this.oldSpot = oldSpot;
    this.turnIndex = turnIndex;
  }

  get spot() {
    return this.player.board.cards[this.position];
  }

  get card() {
    return Card.COLLECTION[this.cardID];
  }

  get category() {
    return this.card?.category || "passive";
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
