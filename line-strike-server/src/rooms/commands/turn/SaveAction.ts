import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { Turn, TurnAction } from "../../schema/Turn";
import { PlayedCard } from "../../schema/PlayedCard";

export interface SaveProps {
  player: Player;
  turn: Turn;
  spot: PlayedCard;
  handIndex: number;
  pp: number;
}

export class SaveAction extends Command<LineStrikeRoom, SaveProps> {
  async execute({ player, turn, spot, handIndex, pp }: SaveProps) {
    turn.usedHand.push(handIndex);
    turn.usedPP += pp;
    turn.actions.push(
      new TurnAction(
        player,
        handIndex,
        spot.cardIndex,
        pp,
        spot.clone(),
        turn.actions.length
      )
    );
  }
}
