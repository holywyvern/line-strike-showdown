import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { ChatLog } from "../../schema/ChatLog";
import { TurnAction } from "../../schema/Turn";
import { GainPP } from "../user/GainPP";
import { PlaceCard } from "./PlaceCard";
import { Wait } from "../utils/Wait";
import { RemoveHand } from "./RemoveHand";
import { ResetTurn } from "../turn/ResetTurn";
import { Player } from "../../schema/Player";

export class PerformSimultaneousActions extends Command<LineStrikeRoom> {
  async execute() {
    const { playerA, playerB } = this.state;
    const { turn: turnA } = playerA;
    const { turn: turnB } = playerB;
    const max = Math.max(turnA.actions.length, turnB.actions.length);
    if (turnA.actions.length < 1) {
      this.state.chat.push(
        new ChatLog({
          type: "stay",
          playerID: playerA.sessionID,
          name: playerA.name,
        })
      );
    }
    if (turnB.actions.length < 1) {
      this.state.chat.push(
        new ChatLog({
          type: "stay",
          playerID: playerB.sessionID,
          name: playerB.name,
        })
      );
    }
    playerA.lastTurn.clear();
    playerA.lastTurn.push(...turnA.actions);
    playerB.lastTurn.clear();
    playerB.lastTurn.push(...turnB.actions);
    const placements: Command[] = [];
    for (let i = 0; i < max; ++i) {
      const actions: Command[] = [];
      const actionA = playerA.lastTurn.at(i);
      const actionB = playerB.lastTurn.at(i);
      if (actionA) {
        actions.push(...this.makeAction(playerA, actionA, i));
      }
      if (actionB) {
        actions.push(...this.makeAction(playerB, actionB, i));
      }
      if (actions.length > 0) {
        actions.push(new Wait().setPayload({ time: 1000 }));
      }
      placements.push(...actions);
    }
    return [
      ...placements,
      new RemoveHand().setPayload({ player: turnA.player }),
      new RemoveHand().setPayload({ player: turnB.player }),
      new ResetTurn().setPayload({ player: turnA.player }),
      new ResetTurn().setPayload({ player: turnB.player }),
    ];
  }

  makeAction(
    player: Player,
    action: TurnAction,
    placeIndex: number
  ): Command[] {
    const { usedPP, handIndex, position } = action;
    return [
      new GainPP().setPayload({ player, pp: -usedPP }),
      new PlaceCard().setPayload({
        player,
        board: player.board,
        handIndex,
        position,
        placeIndex,
        log: true,
      }),
    ];
  }
}
