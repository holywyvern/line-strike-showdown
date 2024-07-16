import { Schema, ArraySchema, type, filter } from "@colyseus/schema";

import type { Client } from "colyseus";

import { Card } from "./Card";
import { Turn } from "./Turn";

import { PlayerBoard } from "./PlayerBoard";
import { LineStrikeState } from "./LineStrikeState";

const OnlySeenByOwner = (player: Player, client: Client) =>
  client.sessionId === player.sessionID;

export class Player extends Schema {
  @type("string")
  sessionID: string;

  client: Client;

  deckIDs: ArraySchema<number>;

  mulligan: boolean;

  @type(PlayerBoard)
  board: PlayerBoard;

  @type("string")
  name: string;

  @type("string")
  avatar: string;

  @type("uint8")
  pp: number;

  @filter(OnlySeenByOwner)
  @type(["uint64"])
  handIDs: ArraySchema<number>;

  @filter(OnlySeenByOwner)
  @type(Turn)
  turn: Turn;

  @type("boolean")
  selected: boolean;

  @type("uint16")
  handSize: number;

  @type("string")
  sleeve: string;

  @type("string")
  playmat: string;

  @type("number")
  playmatOpacity: number;

  @type("uint8")
  deckSize: number;

  state: LineStrikeState;

  mirrored: boolean;

  constructor(
    state: LineStrikeState,
    client: Client,
    name: string,
    avatar: string,
    mirrored = false
  ) {
    super();
    this.state = state;
    this.client = client;
    this.mulligan = false;
    this.name = name;
    this.avatar = avatar;
    this.turn = new Turn(this);
    this.deckIDs = new ArraySchema();
    this.handIDs = new ArraySchema();
    this.board = new PlayerBoard(this);
    this.pp = 0;
    this.sessionID = client.sessionId;
    this.mirrored = mirrored;
    this.selected = false;
    this.handSize = 0;
    this.sleeve = "blue_basic.webp";
    this.playmat = "blue_basic.webp";
    this.playmatOpacity = 0.1;
    this.deckSize = 0;
  }

  get hand() {
    return this.handIDs.map((i) => Card.COLLECTION[i]);
  }

  get hp() {
    return this.board.lanes.filter((i) => i.hp > 0).length;
  }

  get maxHP() {
    return this.board.lanes.length;
  }

  get isDead() {
    return this.hp < this.state.format.deathHP;
  }
}
