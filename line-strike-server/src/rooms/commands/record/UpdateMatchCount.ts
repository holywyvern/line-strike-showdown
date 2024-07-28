import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";
import { database } from "../../../database";

export interface UpdateMatchCountProps {
  player: Player;
}

export class UpdateMatchCount extends Command<
  LineStrikeRoom,
  UpdateMatchCountProps
> {
  async execute({ player }: UpdateMatchCountProps) {
    const { formatID, rankType } = this.state;
    const { accountID } = player;
    if (!accountID) return;

    const type = rankType === "ranked" ? "RANKED" : "UNRANKED";
    database.$transaction(async (tx) => {
      const count = await tx.matchCount.findFirst({
        where: { accountID, formatID, type },
      });
      if (count) {
        let wins = player.victory ? count.wins + 1n : count.wins;
        return tx.matchCount.update({
          where: { id: count.id },
          data: {
            total: count.total + 1n,
            wins,
          },
        });
      }
      return tx.matchCount.create({
        data: {
          accountID,
          formatID,
          wins: player.victory ? 0 : 1,
          total: 1,
          type,
        },
      });
    });
  }
}
