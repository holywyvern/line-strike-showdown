import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { DrawFirstHand, FirstHandProps } from "../intro/DrawFirstHand";

import { CheckAllSelected } from "./CheckAllSelected";
import { ShuffleDeck } from "../intro/ShuffleDeck";

export class DrawFirstHandBack extends Command<LineStrikeRoom, FirstHandProps> {
  async execute({ player }: FirstHandProps) {
    while (player.handIDs.length > 0) {
      player.deckIDs.push(player.handIDs.pop());
    }
    return [
      new ShuffleDeck().setPayload({ player }),
      new DrawFirstHand().setPayload({ player }),
      new CheckAllSelected(),
    ];
  }
}
