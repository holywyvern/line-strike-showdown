import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { PlayerBoard } from "../../schema/PlayerBoard";
import { ChatLog } from "../../schema/ChatLog";

import { CalculateUnitedFront } from "../turn/CalculateUnitedFront";
import { CalculateLaneAttack } from "../turn/CalculateLaneAttack";

export interface PlaceCardProps {
  player: Player;
  board: PlayerBoard;
  handIndex: number;
  position: number;
  placeIndex: number;
  log?: boolean;
}

export class PlaceCard extends Command<LineStrikeRoom, PlaceCardProps> {
  async execute({
    player,
    board,
    handIndex,
    position,
    placeIndex,
    log,
  }: PlaceCardProps) {
    const spot = board.cards[position];
    if (!spot) return;

    spot.cardID = player.handIDs[handIndex];
    spot.buffs = 0;
    spot.baseBuster = spot.includes("baseBuster");
    spot.baseGuard = spot.includes("baseGuard");
    spot.stunned = false;
    spot.incapacitated = false;
    spot.justPlaced = true;
    spot.placeIndex = placeIndex;
    if (board === player.turn) {
      player.client.send("animation", {
        playerID: player.sessionID,
        name: "summon",
        position: spot.realPosition,
      });
    } else {
      const otherClients = this.room.clients.filter(
        (i) => i.sessionId !== player.sessionID
      );
      for (const c of otherClients) {
        c.send("animation", {
          playerID: player.sessionID,
          name: "summon",
          position: spot.realPosition,
        });
      }
    }
    if (log) {
      this.state.chat.push(
        new ChatLog({
          type: "place",
          playerID: player.sessionID,
          name: player.name,
          cardID: spot.cardID,
          handIndex,
          position,
        })
      );
    }
    return [
      new CalculateUnitedFront().setPayload({ board }),
      new CalculateLaneAttack().setPayload({ board }),
    ];
  }
}
