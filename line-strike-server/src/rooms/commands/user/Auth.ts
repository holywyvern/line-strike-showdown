import { Client, ServerError } from "colyseus";
import { StatusCodes } from "http-status-codes";

import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

export interface AuthProps {
  client: Client;
  options: any;
}

export class Auth extends Command<LineStrikeRoom, AuthProps> {
  async execute({ options }: AuthProps) {
    if (!options?.name) {
      throw new ServerError(StatusCodes.UNAUTHORIZED, "Invalid player name");
    }
    if (!options.id) {
      throw new ServerError(StatusCodes.UNAUTHORIZED, "Invalid ID");
    }
    if (this.state.spectators.has(options.id)) {
      throw new ServerError(StatusCodes.UNAUTHORIZED, "Already in");
    }
  }
}
