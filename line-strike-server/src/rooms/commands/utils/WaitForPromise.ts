import { Command } from "@colyseus/command";
import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface WaitForPromiseProps {
  promise: Promise<unknown>;
}

export class WaitForPromise extends Command<
  LineStrikeRoom,
  WaitForPromiseProps
> {
  async execute({ promise }: WaitForPromiseProps) {
    await promise;
  }
}
