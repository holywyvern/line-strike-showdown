import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { Lane } from "../../schema/Lane";
import { ChatLog } from "../../schema/ChatLog";

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
    if (damage < 1) return;

    defender.hp = Math.max(0, defender.hp - damage);

    if (defender.broken) {
      attacker.victory = true;
      this.state.chat.push(
        new ChatLog({
          type: "break",
          playerID: attacker.player.sessionID,
          name: attacker.player.name,
          lane: index,
        })
      );
    }
  }
}
