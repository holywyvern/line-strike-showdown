import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface ActivateSupportsProps {
  player: Player;
}

export class ActivateSupports extends Command<
  LineStrikeRoom,
  ActivateSupportsProps
> {
  async execute({ player }: ActivateSupportsProps) {}
}
