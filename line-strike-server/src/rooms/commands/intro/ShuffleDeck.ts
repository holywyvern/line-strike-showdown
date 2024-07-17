import { Command } from "@colyseus/command";
import { ArraySchema } from "@colyseus/schema";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface ShuffleProps {
  player: Player;
}

export class ShuffleDeck extends Command<LineStrikeRoom, ShuffleProps> {
  async execute({ player }: ShuffleProps) {
    this.shuffleArray(player.deckIDs);
  }

  shuffleArray<T>(array: ArraySchema<T>) {
    let mixes = Math.ceil(Math.random() * 4);
    while (mixes > 0) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array.at(i);
        array.setAt(i, array.at(j));
        array.setAt(j, temp);
      }
      mixes--;
    }
    return array;
  }
}
