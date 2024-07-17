import { Client } from "colyseus";
import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";
import { CalculateUnitedFront } from "./CalculateUnitedFront";
import { CalculateLaneAttack } from "./CalculateLaneAttack";

export interface UndoPayload {
  client: Client;
}

export class UndoAction extends Command<LineStrikeRoom, UndoPayload> {
  async execute({ client }: UndoPayload) {
    const player = this.state.findPlayer(client);
    if (!player) throw new Error("No player found");

    const turn = player.turn;
    if (turn.locked) throw new Error("Turn is locked");
    if (turn.actions.length < 1) throw new Error("No actions in this turn");

    const action = turn.actions.pop();
    turn.usedHand.pop();
    turn.usedPP -= action.usedPP;
    const spot = turn.cards[action.position];
    spot.cardID = action.oldSpot.cardID;
    spot.buffs = action.oldSpot.buffs;
    spot.baseBuster = action.oldSpot.baseBuster;
    spot.baseGuard = action.oldSpot.baseGuard;
    spot.attack = action.oldSpot.attack;
    spot.justPlaced = action.oldSpot.justPlaced;

    return [
      new CalculateUnitedFront().setPayload({ board: turn }),
      new CalculateLaneAttack().setPayload({ board: turn }),
    ];
  }
}
