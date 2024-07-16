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
  | "place";

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
  cardID: number;

  constructor(data: ChatLogProps) {
    super();
    Object.assign(this, data);
    this.timestamp ||= Date.now();
  }
}
