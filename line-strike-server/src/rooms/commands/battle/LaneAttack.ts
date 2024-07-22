import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Lane } from "../../schema/Lane";
import { ChatLog } from "../../schema/ChatLog";

import { SendAttacks } from "./SendAttacks";

export interface LaneAttackProps {
  attacker: Lane;
  defender: Lane;
  index: number;
}

export class LaneAttack extends Command<LineStrikeRoom, LaneAttackProps> {
  async execute({ attacker, defender, index }: LaneAttackProps) {
    const attackedCards = attacker.activeCards;
    const defenderCards = defender.activeCards;
    let damage = attackedCards.length;
    let blocks = 0;
    let busters = 0;
    let attacks = damage;
    for (const card of attackedCards) {
      if (card.baseBuster) {
        card.baseBuster = false;
        busters++;
        damage++;
        attacks++;
      }
    }
    for (const card of defenderCards) {
      if (card.baseGuard) {
        if (damage > 0) damage--;
        card.baseGuard = false;
        blocks++;
      }
    }
    this.state.chat.push(
      new ChatLog({
        type: "attack",
        playerID: attacker.player.sessionID,
        name: attacker.player.name,
        damage,
        busters,
        blocks,
        lane: index,
      })
    );

    return [
      new SendAttacks().setPayload({
        attacker,
        defender,
        damage,
        attacks,
        blocks,
        index,
      }),
    ];
  }
}
