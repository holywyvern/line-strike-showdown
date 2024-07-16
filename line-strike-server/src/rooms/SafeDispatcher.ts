import { Command, Dispatcher } from "@colyseus/command";
import { Room } from "colyseus";

export class SafeDispatcher<R extends Room> extends Dispatcher<R> {
  async safeDispatch<T extends Command>(command: T, payload?: T["payload"]) {
    try {
      const result = await this.dispatch(command, payload);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
