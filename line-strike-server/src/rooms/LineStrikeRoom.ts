import { Client, Room, updateLobby } from "colyseus";

import { LineStrikeState } from "./schema/LineStrikeState";

import { SafeDispatcher } from "./SafeDispatcher";

import { SECRET_LINE_STRIKE_KEY } from "../utils/keys";

import { Format } from "./schema/Format";

import { SendMessage } from "./commands/chat/SendMessage";
import { SelectDeck } from "./commands/intro/SelectDeck";
import { Auth } from "./commands/user/Auth";
import { Join } from "./commands/user/Join";
import { Leave } from "./commands/user/Leave";
import { SwapCards } from "./commands/mulligan/SwapCards";
import { KeepCards } from "./commands/mulligan/KeepCards";
import { PlayCard } from "./commands/turn/PlayCard";
import { UndoAction } from "./commands/turn/UndoAction";
import { LockTurn } from "./commands/turn/LockTurn";

export class LineStrikeRoom extends Room<LineStrikeState> {
  dispatcher = new SafeDispatcher(this);

  async onCreate(options: any) {
    await this.setPrivate(true);
    if (options.__secret_line_strike_key__ !== SECRET_LINE_STRIKE_KEY) {
      throw new Error("Failed to build Line Strike Room");
    }
    const format = Format.COLLECTION[options.formatID];
    if (!format) {
      throw new Error("Invalid Line strike format");
    }
    this.setState(new LineStrikeState(options.formatID));
    this.clock.start();

    this.onMessage("deck", this.onDeckSelect);

    this.onMessage("keep", this.onFirstHandKeep);
    this.onMessage("mulligan", this.onMulligan);

    this.onMessage("play", this.onCardPlayed);
    this.onMessage("undo", this.onUndo);
    this.onMessage("ready", this.onTurnDone);
    this.onMessage("chat", this.onChat);
    const { challenged, challenger, type } = options || {};
    await this.setMetadata({
      challenged,
      challenger,
      type,
      players: [],
      formatID: format.id,
    });
    updateLobby(this);
  }

  onFirstHandKeep = (client: Client) => {
    this.dispatcher.safeDispatch(new KeepCards(), { client });
  };

  onMulligan = (client: Client) => {
    this.dispatcher.safeDispatch(new SwapCards(), { client });
  };

  onCardPlayed = (client: Client, options: any) => {
    this.dispatcher.safeDispatch(new PlayCard(), { ...options, client });
  };

  onUndo = (client: Client) => {
    this.dispatcher.safeDispatch(new UndoAction(), { client });
  };

  onTurnDone = (client: Client) => {
    this.dispatcher.safeDispatch(new LockTurn(), { client });
  };

  onChat = async (client: Client, message: string) => {
    await this.dispatcher.safeDispatch(new SendMessage(), {
      client,
      message: String(message),
    });
  };

  onDeckSelect = async (client: Client, options: any) => {
    await this.dispatcher.safeDispatch(new SelectDeck(), {
      client,
      cards: options?.cards,
      sleeve: options?.sleeve,
      playmat: options?.playmat,
      playmatOpacity: options?.playmatOpacity,
    });
  };

  async onAuth(client: Client, options: any) {
    await this.dispatcher.dispatch(new Auth(), { client, options });
    return true;
  }

  async onJoin(client: Client, options: any) {
    await this.dispatcher.safeDispatch(new Join(), { client, options });
  }

  async onLeave(client: Client) {
    await this.dispatcher.safeDispatch(new Leave(), { client });
  }

  async updateMetaPlayers() {
    await this.setMetadata({
      players: [...this.state.spectators.values()].map((i) => i.id),
    });
    updateLobby(this);
  }
}
