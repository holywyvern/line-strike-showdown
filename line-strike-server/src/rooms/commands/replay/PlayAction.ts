import { Command } from "@colyseus/command";
import { LineStrikeRecordRoom } from "../../LineStrikeRecordRoom";
import { ChatRecord } from "@prisma/client";
import { ChatLog, ChatLogProps, ChatLogType } from "../../schema/ChatLog";
import { StartCombat } from "../turn/StartCombat";
import { StartTurn } from "../turn/StartTurn";
import { PlaceCard } from "../battle/PlaceCard";
import { PlayCard } from "../turn/PlayCard";
import { PlayPlayerCard } from "../turn/PlayPlayerCard";
import { PerformActions } from "../battle/PerformActions";
import { Wait } from "../utils/Wait";
import { CardOpen } from "../battle/CardOpen";
import { ActivateSupports } from "../battle/ActivateSupports";
import { ActivateDisrupts } from "../battle/ActivateDisrupts";
import { PerformAttacks } from "../battle/PerformAttacks";

export interface PlayActionProps {
  chat: ChatRecord;
}

export class PlayAction extends Command<LineStrikeRecordRoom, PlayActionProps> {
  async execute({ chat }: PlayActionProps) {
    switch (chat.type as ChatLogType) {
      case "chat":
      case "join":
      case "elo":
      case "win":
      case "draw":
      case "deck":
      case "leave":
        this.log(chat.type as ChatLogType, chat);
        return;
      case "turn":
        return [new StartTurn().setPayload({ draw: this.state.turn > 0 })];
      case "place":
        const player = this.findPlayer(chat);
        const { handIndex, position } = chat;
        return [
          new PlayPlayerCard().setPayload({ player, handIndex, position }),
        ];
      case "battle":
        return [new StartCombat()];
    }
  }

  log(newType: ChatLogType, record: ChatRecord) {
    const { id, timestamp, type, ...rest } = record;
    this.state.chat.push(new ChatLog({ ...rest, type: newType }));
  }

  findPlayer(chat: ChatRecord) {
    return this.state.players.find((i) => i.sessionID === chat.playerID);
  }
}
