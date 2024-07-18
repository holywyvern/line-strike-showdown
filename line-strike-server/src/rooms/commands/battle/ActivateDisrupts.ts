import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { ActivateSkill } from "./ActvateSkill";
import { ChatLog } from "../../schema/ChatLog";
import { RefreshTurn } from "./RefreshTurn";

export interface ActivateDisruptsProps {
  player: Player;
}

export class ActivateDisrupts extends Command<
  LineStrikeRoom,
  ActivateDisruptsProps
> {
  async execute({ player }: ActivateDisruptsProps) {
    const disrupts = player.lastTurn.filter((i) => i.category === "disrupt");
    const activations: Command[] = [];
    for (const action of disrupts) {
      activations.push(new ActivateSkill().setPayload({ player, action }));
    }
    if (activations.length > 0) {
      this.state.chat.push(
        new ChatLog({
          type: "disrupts",
          playerID: player.sessionID,
          name: player.name,
        })
      );
      activations.push(
        new RefreshTurn().setPayload({ player: this.state.playerA }),
        new RefreshTurn().setPayload({ player: this.state.playerB })
      );
    }
    return activations;
  }
}
