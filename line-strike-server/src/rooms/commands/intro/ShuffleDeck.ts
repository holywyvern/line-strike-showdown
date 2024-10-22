import { Command } from "@colyseus/command";
import { ArraySchema } from "@colyseus/schema";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface ShuffleProps {
  player: Player;
}

export class ShuffleDeck extends Command<LineStrikeRoom, ShuffleProps> {
  async execute({ player }: ShuffleProps) {
    const list = this.shuffleArray([...player.deckIDs]);
    player.deckIDs.clear();
    player.deckIDs.push(...list);
  }

  shuffleArray<T>(array: T[]) {
    let mixes = Math.ceil(Math.random() * 4);
    while (mixes > 0) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      mixes--;
    }
    return array;
  }
}
