import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface ResetTurnProps {
  player: Player;
}

export class ResetTurn extends Command<LineStrikeRoom, ResetTurnProps> {
  async execute({ player }: ResetTurnProps) {
    player.turn.actions.clear();
    player.turn.locked = false;
    player.turn.usedHand.clear();
    player.turn.usedPP = 0;
  }
}
