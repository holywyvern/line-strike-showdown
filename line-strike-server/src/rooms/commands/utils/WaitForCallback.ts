import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface WaitForCallbackProps {
  callback: () => Promise<unknown>;
}

export class WaitForCallback extends Command<
  LineStrikeRoom,
  WaitForCallbackProps
> {
  async execute({ callback }: WaitForCallbackProps) {
    await callback();
  }
}
