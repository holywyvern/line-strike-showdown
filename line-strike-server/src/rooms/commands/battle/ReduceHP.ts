import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Lane } from "../../schema/Lane";

export interface ReduceHpProps {
  defender: Lane;
  amount: number;
}

export class ReduceHp extends Command<LineStrikeRoom, ReduceHpProps> {
  async execute({ defender, amount }: ReduceHpProps) {
    defender.hp = Math.max(0, defender.hp - amount);
    const turn = defender.player.turn.lanes[defender.position];
    turn.hp = defender.hp;
  }
}
