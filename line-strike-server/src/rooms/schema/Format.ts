import { Schema, ArraySchema, MapSchema, type } from "@colyseus/schema";

import { Card, CardElement, CardSet } from "./Card";

export interface FormatProps {
  id: number;
  name: string;
  sets: CardSet[];
  defaultDeck: number[];
  maxElements?: number;
  minCards?: number;
  maxCards?: number;
  maxDecks?: number;
  maxRepeats?: number;
  allowedElements?: CardElement[];
  description: string;
  lanes?: number;
  laneLength?: number;
  laneHP?: number;
  limitedCards?: Record<string, number>;
  maxPP?: number;
  deathHP?: number;
  cardsDrawnOnLineDestroy?: number;
  ppPerTurn?: number;
  turnSeconds?: number;
  mulliganSeconds?: number;
  initialHandSize?: number;
}

export class Format extends Schema {
  static COLLECTION: Format[] = [null];
  static STANDARD_ID = 1;

  static get STANDARD_FORMAT() {
    return this.COLLECTION[this.STANDARD_ID];
  }

  @type("uint64")
  id: number;

  @type("string")
  name: string;

  @type("string")
  description: string;

  @type(["string"])
  sets: ArraySchema<CardSet>;

  @type(["uint64"])
  defaultDeck: ArraySchema<number>;

  @type({ map: "uint8" })
  limitedCards: MapSchema<number>;

  @type("uint8")
  maxElements: number;

  @type("uint8")
  maxRepeats: number;

  @type("uint32")
  mulliganSeconds: number;

  @type(["string"])
  allowedElements: ArraySchema<CardElement>;

  @type("uint8")
  minCards: number;

  @type("uint8")
  maxCards: number;

  @type("uint8")
  maxDecks: number;

  @type("uint8")
  maxPP: number;

  @type("uint8")
  ppPerTurn: number;

  @type("uint8")
  lanes: number;

  @type("uint8")
  laneLength: number;

  @type("uint8")
  laneHP: number;

  @type("uint8")
  deathHP: number;

  @type("uint8")
  cardsDrawnOnLineDestroy: number;

  @type("boolean")
  standard: boolean;

  @type("uint32")
  turnSeconds: number;

  @type("uint64")
  initialHandSize: number;

  constructor({
    id,
    name,
    description,
    sets,
    maxElements,
    minCards,
    maxCards,
    defaultDeck,
    allowedElements,
    lanes,
    laneLength,
    laneHP,
    maxDecks,
    deathHP,
    cardsDrawnOnLineDestroy,
    maxRepeats,
    limitedCards,
    maxPP,
    ppPerTurn,
    turnSeconds,
    mulliganSeconds,
    initialHandSize,
  }: FormatProps) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.sets = new ArraySchema(...sets);
    this.maxElements = maxElements || 6;
    this.minCards = minCards || 15;
    this.maxCards = maxCards || 15;
    this.maxDecks = maxDecks || 10;
    this.maxRepeats = maxRepeats || 3;
    this.deathHP = deathHP || 2;
    this.cardsDrawnOnLineDestroy = cardsDrawnOnLineDestroy || 1;
    this.defaultDeck = new ArraySchema(...defaultDeck);
    this.limitedCards = new MapSchema(limitedCards || {});
    this.allowedElements = new ArraySchema(
      ...(allowedElements || [
        "fire",
        "ice",
        "wind",
        "lightning",
        "light",
        "darkness",
      ])
    );
    this.lanes = lanes || 3;
    this.laneLength = laneLength || 3;
    this.laneHP = laneHP || 5;
    this.maxPP = maxPP || 10;
    this.ppPerTurn = ppPerTurn || 3;
    this.standard = id === Format.STANDARD_ID;
    this.turnSeconds = turnSeconds || 60;
    this.mulliganSeconds = mulliganSeconds || 30;
    this.initialHandSize = initialHandSize || 5;
  }

  isLegal(card: Card, count: number) {
    if (!this.allowedElements.includes(card.element)) return false;
    if (!this.sets.includes(card.set)) return false;
    if (count > this.maxRepeats) return false;
    if (this.limitedCards.has(String(card.id))) {
      const max = this.limitedCards.get(String(card.id));
      if (count > max) return false;
    }

    return true;
  }
}

Format.COLLECTION.push(
  ...(
    [
      {
        id: 1,
        name: "Version 1",
        description:
          "LINE STRIKE as originally released,\n without any expansions.",
        sets: ["Version 1"],
        // prettier-ignore
        defaultDeck: [
           1,  1, 20, 20, 16,
          16, 17, 17,  2,  2,
          32,  8, 19,  4, 21
        ],
      },
    ] satisfies FormatProps[]
  ).map((i) => new Format(i))
);
