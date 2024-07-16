import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface WaitProps {
  time: number;
}

export class Wait extends Command<LineStrikeRoom, WaitProps> {
  async execute({ time }: WaitProps) {
    await new Promise((resolve) => {
      this.clock.setTimeout(resolve, time);
    });
  }
}
