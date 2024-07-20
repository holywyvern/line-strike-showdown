import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { CalculateUnitedFront } from "./CalculateUnitedFront";
import { CalculateLaneAttack } from "./CalculateLaneAttack";

export interface ResetPlaysProps {
  player: Player;
}

export class ResetPlays extends Command<LineStrikeRoom> {
  async execute({ player }: ResetPlaysProps) {
    for (const card of player.board.cards) {
      card.stunned = false;
      card.justPlaced = false;
    }
    for (const card of player.turn.cards) {
      card.stunned = false;
      card.justPlaced = false;
    }
    return [
      new CalculateUnitedFront().setPayload({ board: player.board }),
      new CalculateLaneAttack().setPayload({ board: player.board }),
      new CalculateUnitedFront().setPayload({ board: player.turn }),
      new CalculateLaneAttack().setPayload({ board: player.turn }),
    ];
  }
}
