import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";
import { TurnAction } from "../../schema/Turn";
import { Player } from "../../schema/Player";
import { ChatLog } from "../../schema/ChatLog";
import { GainPP } from "../user/GainPP";
import { DrawCard } from "../turn/DrawCard";
import { BuffCards } from "../effects/BuffCards";
import { MoveCards } from "../effects/MoveCards";
import { StunCards } from "../effects/StunCards";
import { Wait } from "../utils/Wait";
import { SwapCard } from "../effects/SwapCards";

export interface ActivateSkillProps {
  player: Player;
  action: TurnAction;
}

export class ActivateSkill extends Command<LineStrikeRoom, ActivateSkillProps> {
  async execute({ player, action }: ActivateSkillProps) {
    const card = action.card;
    if (!card) return;

    const skill = card.skill;
    if (!skill) return;

    this.state.chat.push(
      new ChatLog({
        type: "skill",
        playerID: player.sessionID,
        name: player.name,
        cardID: action.cardID,
        position: action.position,
      })
    );

    const actions: Command[] = [];
    if (skill.tags.includes("addPP")) {
      actions.push(
        new GainPP().setPayload({ player, log: true, pp: card.amount })
      );
    }
    if (skill.tags.includes("drawCard")) {
      actions.push(new DrawCard().setPayload({ player }));
    }
    if (skill.tags.includes("buff")) {
      actions.push(
        new BuffCards().setPayload({
          player,
          reverse: false,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("debuff")) {
      actions.push(
        new BuffCards().setPayload({
          player,
          reverse: true,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("moveAlly")) {
      actions.push(
        new MoveCards().setPayload({
          player,
          reverse: false,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("moveEnemy")) {
      actions.push(
        new MoveCards().setPayload({
          player,
          reverse: true,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("stun")) {
      actions.push(
        new StunCards().setPayload({
          player,
          reverse: true,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("swapAlly")) {
      actions.push(
        new SwapCard().setPayload({
          player,
          reverse: false,
          card: action.spot,
        })
      );
    }
    if (skill.tags.includes("swapEnemy")) {
      actions.push(
        new SwapCard().setPayload({
          player,
          reverse: true,
          card: action.spot,
        })
      );
    }
    if (actions.length > 0) {
      actions.push(new Wait().setPayload({ time: actions.length * 300 }));
    }
    return actions;
  }
}
