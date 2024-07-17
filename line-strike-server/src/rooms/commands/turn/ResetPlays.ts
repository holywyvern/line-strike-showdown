import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";


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
  }
}