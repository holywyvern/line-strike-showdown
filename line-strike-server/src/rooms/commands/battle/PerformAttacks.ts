import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { LaneAttack } from "./LaneAttack";
import { RefreshTurn } from "./RefreshTurn";
import { ChatLog } from "../../schema/ChatLog";
import { Wait } from "../utils/Wait";
import { WaitForPromise } from "../utils/WaitForPromise";
import { WaitForCallback } from "../utils/WaitForCallback";
import { CheckBreak } from "./CheckBreak";

export class PerformAttacks extends Command<LineStrikeRoom> {
  async execute() {
    const attacks: Command[] = [];
    const lanesA = this.state.playerA.board.sortedLanes;
    const lanesB = this.state.playerB.board.sortedLanes;
    for (let i = 0; i < lanesA.length; ++i) {
      const laneA = lanesA[i];
      const laneB = lanesB[i];
      if (laneA.broken || laneB.broken) continue;
      if (laneA.attack === 0 && laneB.attack === 0) continue;

      if (laneA.attack === laneB.attack) {
        const callback = () =>
          Promise.all([
            this.room.dispatcher.dispatch(new LaneAttack(), {
              attacker: laneA,
              defender: laneB,
              index: i,
            }),
            this.room.dispatcher.dispatch(new LaneAttack(), {
              attacker: laneB,
              defender: laneA,
              index: i,
            }),
          ]);
        attacks.push(
          new WaitForCallback().setPayload({ callback }),
          new CheckBreak().setPayload({
            attacker: laneA,
            defender: laneB,
            index: i,
          }),
          new CheckBreak().setPayload({
            attacker: laneB,
            defender: laneA,
            index: i,
          })
        );
      } else if (laneA.attack > laneB.attack) {
        attacks.push(
          new LaneAttack().setPayload({
            attacker: laneA,
            defender: laneB,
            index: i,
          }),
          new CheckBreak().setPayload({
            attacker: laneA,
            defender: laneB,
            index: i,
          })
        );
      } else if (laneA.attack < laneB.attack) {
        attacks.push(
          new LaneAttack().setPayload({
            attacker: laneB,
            defender: laneA,
            index: i,
          }),
          new CheckBreak().setPayload({
            attacker: laneB,
            defender: laneA,
            index: i,
          })
        );
      }
    }
    if (attacks.length > 0) {
      this.state.chat.push(new ChatLog({ type: "battle" }));
    }
    return [
      ...attacks,
      new RefreshTurn().setPayload({ player: this.state.playerA }),
      new RefreshTurn().setPayload({ player: this.state.playerB }),
    ];
  }
}
