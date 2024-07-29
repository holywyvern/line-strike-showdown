import { Client, Delayed } from "colyseus";
import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";
import { ChatRecord, MatchRecord, MatchRecordPlayer } from "@prisma/client";

import { Player } from "./Player";
import { Format } from "./Format";
import { Spectator } from "./Spectator";
import { ChatLog } from "./ChatLog";

export type LineStrikePhase =
  | "intro"
  | "firstDraw"
  | "start"
  | "planning"
  | "battle"
  | "finished";

export class LineStrikeState extends Schema {
  rankType: string;

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

  @type("uint64")
  turnTimeLeft: number;

  @type("string")
  musicName: string;

  @type("boolean")
  replay: boolean;

  turnTimestamp: number;

  delayed: Delayed | null;

  recorded: boolean;

  @type("boolean")
  paused: boolean;

  match?: MatchRecord & {
    playerA: MatchRecordPlayer;
    playerB: MatchRecordPlayer;
    chats: ChatRecord[];
  };

  constructor(formatID: number, rankType: string) {
    super();
    this.replay = false;
    this.paused = false;
    this.rankType = rankType;
    this.formatID = formatID;
    this.format = Format.COLLECTION[formatID];
    this.spectators = new MapSchema();
    this.turn = 0;
    this.delayed = null;
    this.playerA = null;
    this.playerB = null;
    this.phase = "intro";
    this.musicName = "begin";
    this.turnTimeLeft = 0;
    this.turnTimestamp = Date.now();
    this.chat = new ArraySchema();
    this.recorded = false;
  }

  get players() {
    return [this.playerA, this.playerB].filter(Boolean);
  }

  findTarget(player: Player, reverse = false) {
    let target = player;
    if (reverse) {
      target = player === this.playerA ? this.playerB : this.playerA;
    }
    return target;
  }

  findPlayer(client: Client) {
    return this.players.find((i) => i.sessionID === client.sessionId);
  }

  findName(client: Client) {
    return this.spectators.get(client.sessionId)?.name;
  }
}
