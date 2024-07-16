import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Player } from "../../schema/Player";

export interface FirstHandProps {
  player: Player;
}

export class DrawFirstHand extends Command<LineStrikeRoom, FirstHandProps> {
  async execute({ player }: FirstHandProps) {
    const format = this.state.format;
    while (player.handSize < format.initialHandSize) {
      player.handIDs.push(player.deckIDs.pop());
      player.handSize++;
      player.deckSize--;
    }
  }
}
