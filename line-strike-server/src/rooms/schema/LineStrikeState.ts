import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import { Client, Delayed } from "colyseus";
import { Format } from "./Format";
import { Spectator } from "./Spectator";
import { ChatLog } from "./ChatLog";

export type LineStrikePhase =
  | "intro"
  | "firstDraw"
  | "planning"
  | "battle"
  | "finished";

export class LineStrikeState extends Schema {
  @type(Player)
  playerA: Player | null;

  @type(Player)
  playerB: Player | null;

  @type("uint64")
  turn: number;

  format: Format;

  @type("uint64")
  formatID: number;

  @type({ map: Spectator })
  spectators: MapSchema<Spectator>;

  @type("string")
  phase: LineStrikePhase;

  @type([ChatLog])
  chat: ArraySchema<ChatLog>;

  delayed: Delayed | null;

  constructor(formatID: number) {
    super();
    this.formatID = formatID;
    this.format = Format.COLLECTION[formatID];
    this.spectators = new MapSchema();
    this.turn = 0;
    this.delayed = null;
    this.playerA = null;
    this.playerB = null;
    this.phase = "intro";
    this.chat = new ArraySchema();
  }

  get players() {
    return [this.playerA, this.playerB].filter(Boolean);
  }

  findPlayer(client: Client) {
    return this.players.find((i) => i.sessionID === client.sessionId);
  }

  findName(client: Client) {
    return this.spectators.get(client.sessionId)?.name;
  }
}
