import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Lane } from "../../schema/Lane";
import { Attack } from "./Attack";
import { ReduceHp } from "./ReduceHP";
import { Wait } from "../utils/Wait";

export interface SendAttacksProps {
  attacker: Lane;
  defender: Lane;
  damage: number;
  attacks: number;
  blocks: number;
  index: number;
}

export class SendAttacks extends Command<LineStrikeRoom, SendAttacksProps> {
  async execute({
    attacker,
    defender,
    damage,
    attacks,
    blocks,
    index,
  }: SendAttacksProps) {
    const commands: Command[] = [];
    while (attacks > 0) {
      attacks--;
      commands.push(
        new Wait().setPayload({ time: 250 }),
        new Attack().setPayload({
          attacker,
          defender,
          blocked: blocks > 0,
          index,
        }),
        new Wait().setPayload({ time: 250 })
      );
      if (damage > 0) {
        commands.push(new ReduceHp().setPayload({ defender, amount: 1 }));
      }
      commands.push(new Wait().setPayload({ time: 1000 }));
      damage--;
      blocks--;
    }
    return commands;
  }
}
