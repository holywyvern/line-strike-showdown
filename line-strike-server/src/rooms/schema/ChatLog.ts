import { Schema, type } from "@colyseus/schema";

export type ChatLogType =
  | "chat"
  | "join"
  | "leave"
  | "deck"
  | "mulligan"
  | "keep"
  | "turn"
  | "win"
  | "draw"
  | "drawCard"
  | "place"
  | "battleStart"
  | "lock"
  | "stay"
  | "attack"
  | "break"
  | "battle"
  | "skill"
  | "supports"
  | "disrupts"
  | "pp"
  | "buff"
  | "stun"
  | "move"
  | "swap"
  | "elo"
  | "recording"
  | "recorded";

export type ChatLogProps = Partial<ChatLog> & {
  type: ChatLogType;
};

export class ChatLog extends Schema {
  @type("string")
  playerID: string;

  @type("string")
  name: string;

  @type("uint64")
  timestamp: number;

  @type("string")
  message: string;

  @type("string")
  type: ChatLogType;

  @type("uint64")
  turn: number;

  @type("uint64")
  position: number;

  @type("uint64")
  newPosition: number;

  @type("uint64")
  cardID: number;

  @type("uint8")
  blocks: number;

  @type("int8")
  damage: number;

  @type("uint8")
  busters: number;

  @type("uint8")
  lane: number;

  handIndex: number;

  @type("int64")
  oldValue: number;

  @type("int64")
  newValue: number;

  constructor(data: ChatLogProps) {
    super();
    Object.assign(this, data);
    this.timestamp ||= Date.now();
  }
}
