import { Command } from "@colyseus/command";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { Player } from "../../schema/Player";

import { database } from "../../../database";
import { AccountELO } from "@prisma/client";

export class UpdateELO extends Command<LineStrikeRoom> {
  async execute() {
    const { playerA, playerB } = this.state;
    if (playerA.accountID === playerB.accountID) return;

    const [a, b] = await Promise.all([
      this.findELO(playerA),
      this.findELO(playerB),
    ]);
    await database.$transaction([
      database.accountELO.update({
        where: { id: a.id },
        data: {
          value: Math.max(100, this.calculate(a, b, playerA.victory)),
          matches: a.matches + 1,
        },
      }),
      database.accountELO.update({
        where: { id: b.id },
        data: {
          value: Math.max(100, this.calculate(b, a, playerB.victory)),
          matches: b.matches + 1,
        },
      }),
    ]);
  }

  calculate(a: AccountELO, b: AccountELO, victory: boolean) {
    const addition = victory ? 400 : -400;
    const value = b.matches < 10 ? 1500 : b.value;
    return a.value + addition + value;
  }

  async findELO(player: Player) {
    const { formatID } = this.state;
    const { accountID } = player;
    if (!accountID) return null;

    const elo = await database.accountELO.findFirst({
      where: { accountID, formatID },
    });
    if (elo) return elo;

    return database.accountELO.create({ data: { accountID, formatID } });
  }
}
