import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Card } from "../../schema/Card";
import { ChatLog } from "../../schema/ChatLog";
import { StartMulliganPhase } from "./StartMulliganPhase";

export interface SelectDeckPayload {
  client: Client;
  sleeve: string;
  playmat: string;
  playmatOpacity: number;
  cards: number[];
}

export class SelectDeck extends Command<LineStrikeRoom, SelectDeckPayload> {
  async execute({
    client,
    cards,
    sleeve,
    playmat,
    playmatOpacity,
  }: SelectDeckPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;
    if (player.selected) return;
    if (!Array.isArray(cards)) return;
    if (this.state.phase !== "intro") return;
    if (typeof sleeve !== "string") return;
    if (typeof playmat !== "string") return;
    if (typeof playmatOpacity !== "number") return;

    const cardObjects = cards.map((i) => Card.COLLECTION[i]).filter(Boolean);
    const format = this.state.format;
    if (cards.length < format.minCards) return false;
    if (cards.length > format.maxCards) return false;

    const allLegal = cardObjects.every((card) =>
      format.isLegal(card, cardObjects.filter((i) => i.id === card.id).length)
    );
    if (!allLegal) return false;

    const elements = new Set(cardObjects.map((i) => i.element));
    if (elements.size > format.maxElements) return false;

    player.deckIDs.push(...cards);
    player.deckSize = cards.length;
    player.selected = true;
    player.sleeve = sleeve;
    player.playmat = playmat;
    player.playmatOpacity = playmatOpacity;

    console.log(`Player ${player.name} selected a deck.`);
    this.state.chat.push(
      new ChatLog({
        playerID: player.sessionID,
        name: player.name,
        type: "deck",
      })
    );
    if (this.state.players.every((i) => i.selected)) {
      console.log(`All players selected their decks!`);
      return [new StartMulliganPhase()];
    }
  }
}
