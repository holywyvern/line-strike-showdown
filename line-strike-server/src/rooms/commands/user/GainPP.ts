import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

export interface GainPpPayload {
  player: Player;
  pp: number;
}

export class GainPP extends Command<LineStrikeRoom, GainPpPayload> {
  async execute({ player, pp }: GainPpPayload) {
    const format = this.state.format;
    player.pp = Math.min(format.maxPP, Math.max(0, player.pp + pp));
  }
}
