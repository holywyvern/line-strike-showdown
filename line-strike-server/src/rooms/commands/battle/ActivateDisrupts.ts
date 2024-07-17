import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface ActivateDisruptsProps {
  player: Player;
}

export class ActivateDisrupts extends Command<LineStrikeRoom, ActivateDisruptsProps> {
  async execute({ player }: ActivateDisruptsProps) {}
}
