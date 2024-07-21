import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Lane } from "../../schema/Lane";
import { Wait } from "../utils/Wait";

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
      index,
      blocked,
    });
  }
}
