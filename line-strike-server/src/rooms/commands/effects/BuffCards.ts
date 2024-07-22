import { Command } from "@colyseus/command";

import { Player } from "../../schema/Player";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { RefreshTurn } from "../battle/RefreshTurn";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";
import { ChatLog } from "../../schema/ChatLog";
import { PlayedCard } from "../../schema/PlayedCard";

export interface BuffCardsProps {
  player: Player;
  card: PlayedCard;
  reverse: boolean;
}

export class BuffCards extends Command<LineStrikeRoom, BuffCardsProps> {
  async execute({ player, reverse, card }: BuffCardsProps) {
    const target = this.state.findTarget(player, reverse);
    const board = target.board;
    const targets = reverse ? board.reversedCards : board.cards;
    for (let i = 0; i < targets.length; ++i) {
      const buff = card.card.area[i] || 0;
      if (buff !== 0) {
        this.state.chat.push(
          new ChatLog({
            type: "buff",
            position: targets[i].realPosition,
            cardID: card.cardID,
            damage: buff,
          })
        );
        this.room.broadcast("animation", {
          playerID: target.sessionID,
          name: buff > 0 ? "buff" : "debuff",
          position: targets[i].realPosition,
        });
        if (targets[i] === card) continue;
        targets[i].buffs += buff;
      }
    }
    return [
      new CalculateLaneAttack().setPayload({ board }),
      new RefreshTurn().setPayload({ player: target }),
    ];
  }
}
