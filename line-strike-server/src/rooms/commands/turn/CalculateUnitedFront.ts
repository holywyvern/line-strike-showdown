import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { PlayerBoard } from "../../schema/PlayerBoard";

export interface CalculateUnitedFrontProps {
  board: PlayerBoard;
}

export class CalculateUnitedFront extends Command<
  LineStrikeRoom,
  CalculateUnitedFrontProps
> {
  async execute({ board }: CalculateUnitedFrontProps) {
    for (const card of board.cards) {
      card.unitedFront = board.allies - 1;
    }
  }
}
