import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { ActivateSkill } from "./ActvateSkill";
import { ChatLog } from "../../schema/ChatLog";
import { RefreshTurn } from "./RefreshTurn";

export interface ActivateSupportsProps {
  player: Player;
}

export class ActivateSupports extends Command<
  LineStrikeRoom,
  ActivateSupportsProps
> {
  async execute({ player }: ActivateSupportsProps) {
    const supports = player.lastTurn.filter((i) => i.category === "support");
    const activations: Command[] = [];
    for (const action of supports) {
      activations.push(new ActivateSkill().setPayload({ player, action }));
    }
    if (activations.length > 0) {
      this.state.chat.push(
        new ChatLog({
          type: "supports",
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
