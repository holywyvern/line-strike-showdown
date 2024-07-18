import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { StartTurn } from "../turn/StartTurn";
import { ChatLog } from "../../schema/ChatLog";

export class CheckVictory extends Command<LineStrikeRoom> {
  async execute() {
    const { format, playerA, playerB } = this.state;
    let finish = false;
    if (playerA.hp < format.deathHP) {
      finish = true;
      if (playerB.hp < format.deathHP) {
        this.state.chat.push(new ChatLog({ type: "draw" }));
      } else {
        this.state.chat.push(
          new ChatLog({
            type: "win",
            playerID: playerB.sessionID,
            name: playerB.name,
          })
        );
      }
    } else if (playerB.hp < format.deathHP) {
      finish = true;
      this.state.chat.push(
        new ChatLog({
          type: "win",
          playerID: playerA.sessionID,
          name: playerA.name,
        })
      );
    }
    if (finish) {
      this.state.phase = "finished";
      return;
    }
    return [new StartTurn().setPayload({ draw: true })];
  }
}
