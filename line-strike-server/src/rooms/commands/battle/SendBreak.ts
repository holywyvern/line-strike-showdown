import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface SendBreakProps {
  playerID: string;
}

export class SendBreak extends Command<LineStrikeRoom, SendBreakProps> {
  async execute({ playerID }: SendBreakProps) {
    this.room.broadcast("break", { playerID });
  }
}
