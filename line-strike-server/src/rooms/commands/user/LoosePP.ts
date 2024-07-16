import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { GainPP } from "./GainPP";

export interface LoosePpPayload {
  player: Player;
  pp: number;
}

export class LoosePP extends Command<LineStrikeRoom, LoosePpPayload> {
  async execute({ player, pp }: LoosePpPayload) {
    return [new GainPP().setPayload({ player, pp: -pp })];
  }
}
