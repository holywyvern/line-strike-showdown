import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Card } from "../../schema/Card";
import { ChatLog } from "../../schema/ChatLog";
import { StartMulliganPhase } from "./StartMulliganPhase";

export interface SelectDeckPayload {
  client: Client;
  deck: number[];
}

export class SelectDeck extends Command<LineStrikeRoom, SelectDeckPayload> {
  async execute({ client, deck }: SelectDeckPayload) {
    const player = this.state.findPlayer(client);
    if (!player) return;
    if (player.selected) return;
    if (!Array.isArray(deck)) return;
    if (this.state.phase !== "intro") return;

    const cards = deck.map((i) => Card.COLLECTION[i]).filter(Boolean);
    const format = this.state.format;
    if (deck.length < format.minCards) return false;
    if (deck.length > format.maxCards) return false;

    const allLegal = cards.every((card) =>
      format.isLegal(card, cards.filter((i) => i.id === card.id).length)
    );
    if (!allLegal) return false;

    const elements = new Set(cards.map((i) => i.element));
    if (elements.size > format.maxElements) return false;

    player.deckIDs.push(...deck);
    player.selected = true;

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
