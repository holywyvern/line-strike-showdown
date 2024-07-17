import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface RemoveHandProps {
  player: Player;
}

export class RemoveHand extends Command<LineStrikeRoom, RemoveHandProps> {
  async execute({ player }: RemoveHandProps) {
    const ids = player.handIDs.filter(
      (_, index) => !player.turn.usedHand.includes(index)
    );
    player.handIDs.clear();
    player.handIDs.push(...ids);
    player.handSize = player.handIDs.length;
  }
}
