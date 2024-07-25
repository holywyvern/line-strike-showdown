import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Lane } from "../../schema/Lane";

export interface AttackProps {
  attacker: Lane;
  defender: Lane;
  blocked: boolean;
  index: number;
}

export class Attack extends Command<LineStrikeRoom, AttackProps> {
  async execute({ defender, index, blocked }: AttackProps) {
    this.room.broadcast("attack", {
      playerID: defender.player.sessionID,
      index: defender.player.mirrored ? 2 - index : index,
      blocked,
    });
  }
}
