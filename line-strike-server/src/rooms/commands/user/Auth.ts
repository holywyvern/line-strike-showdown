import { Client, ServerError } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";


export interface AuthProps {
  client: Client;
  options: any;
}

export class Auth extends Command<LineStrikeRoom, AuthProps> {
  async execute({ options }: AuthProps) {
    if (!options?.name) {
      throw new ServerError(422, "Invalid player name");
    }
    if (!options.id) {
      throw new ServerError(422, "Invalid ID");
    }
    if (this.state.spectators.has(options.id)) {
      throw new ServerError(422, "Already in");
    }
  }
}
