import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";
import { PlaceCard } from "./PlaceCard";
import { GainPP } from "../user/GainPP";
import { ResetTurn } from "../turn/ResetTurn";
import { ActivateSupports } from "./ActivateSupports";

export interface PerformActionsProps {
  player: Player;
}

export class PerformActions extends Command<
  LineStrikeRoom,
  PerformActionsProps
> {
  async execute({ player }: PerformActionsProps) {
    if (player.turn.actions.length < 1) {
      this.state.chat.push(
        new ChatLog({
          type: "stay",
          playerID: player.sessionID,
          name: player.name,
        })
      );
      return;
    }
    player.lastTurn.clear();
    player.lastTurn.push(...player.turn.actions);
    const placements: Command[] = [];
    let placeIndex = 0;
    for (const action of player.lastTurn) {
      const { handIndex, position, usedPP } = action;
      placements.push(
        new ResetTurn().setPayload({ player }),
        new GainPP().setPayload({ player, pp: -usedPP }),
        new PlaceCard().setPayload({
          player,
          board: player.board,
          handIndex,
          position,
          placeIndex,
          log: true,
        })
      );
      placeIndex++;
    }
    return placements;
  }
}
