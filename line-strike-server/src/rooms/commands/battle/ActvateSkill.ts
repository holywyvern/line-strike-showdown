import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { TurnAction } from "../../schema/Turn";
import { Player } from "../../schema/Player";
import { ChatLog } from "../../schema/ChatLog";

export interface ActivateSkillProps {
  player: Player;
  action: TurnAction;
}

export class ActivateSkill extends Command<LineStrikeRoom, ActivateSkillProps> {
  async execute({ player, action }: ActivateSkillProps) {
    this.state.chat.push(
      new ChatLog({
        type: "skill",
        playerID: player.sessionID,
        name: player.name,
        cardID: action.cardID,
        position: action.position,
      })
    );
    // TODO: Perform effects
  }
}
