import { z } from "zod";
import { ApplicationController } from "./ApplicationController";
import { database } from "../database";

const PATH_VALIDATOR = z.object({ accountID: z.string() });

const QUERY_VALIDATOR = z.object({
  page: z.coerce.number().int().optional().default(0),
});

export class MatchRecordsController extends ApplicationController {
  async index() {
    const { page } = QUERY_VALIDATOR.parse(this.query);
    const { accountID } = PATH_VALIDATOR.parse(this.params);
    const { matchesA, matchesB } = await database.account.findUniqueOrThrow({
      where: { id: BigInt(accountID) },
      include: {
        matchesA: {
          take: 5,
          skip: page * 5,
          orderBy: { createdAt: "desc" },
          select: {
            createdAt: true,
            id: true,
            result: true,
            formatID: true,
            type: true,
            playerB: {
              select: {
                name: true,
              },
            },
          },
        },
        matchesB: {
          take: 5,
          skip: page * 5,
          orderBy: { createdAt: "desc" },
          select: {
            createdAt: true,
            id: true,
            result: true,
            formatID: true,
            type: true,
            playerA: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const matches = [
      ...matchesA.map(
        ({ id, result, formatID, createdAt, type, playerB: { name: vs } }) => ({
          id,
          vs,
          formatID,
          createdAt,
          type,
          invert: true,
          result:
            result === "DRAW"
              ? "DRAW"
              : result === "VICTORY_A"
              ? "WON"
              : "LOST",
        })
      ),
      ...matchesB.map(
        ({ id, result, formatID, createdAt, type, playerA: { name: vs } }) => ({
          id,
          vs,
          formatID,
          createdAt,
          type,
          invert: false,
          result:
            result === "DRAW"
              ? "DRAW"
              : result === "VICTORY_B"
              ? "WON"
              : "LOST",
        })
      ),
    ];
    this.json({ page, accountID, matches });
  }
}
