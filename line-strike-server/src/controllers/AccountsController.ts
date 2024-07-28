import { StatusCodes } from "http-status-codes";

import { database } from "../database";

import { ApplicationController } from "./ApplicationController";

import { Account } from "../validators/Account";

import { EmailVerification } from "../services/EmailVerification";
import { AuthToken } from "../services/AuthToken";
import { Password } from "../services/Password";
import { z } from "zod";
import { ServerError } from "colyseus";
import { Prisma } from "@prisma/client";

const ID_VALIDATOR = z.object({ accountID: z.string() });
const NAME_VALIDATOR = z.object({ name: z.string().min(1) });

export class AccountsController extends ApplicationController {
  async index() {
    const { name } = await NAME_VALIDATOR.parseAsync(this.query);
    const value = `%${name}%`;
    const names: any[] = await database.$queryRaw(
      Prisma.sql`SELECT value as name, "Account"."id" as id FROM "public"."Name" JOIN "public"."Account" on "Account"."id" = "Name"."accountID" WHERE value LIKE ${value} `
    );
    this.json(names.map(({ name, id }) => ({ name, accountID: id })));
  }

  async create() {
    const { email, password, name } = await Account.parseAsync(this.body);
    const passwordHash = await Password.hash(password);
    const account = await database.account.create({
      data: {
        email,
        passwordHash,
        emailVerified: false,
        names: {
          create: [{ value: name }],
        },
      },
    });
    const { id, emailVerified } = account;
    await EmailVerification.verify(account);
    const token = await AuthToken.generate({ id, email });
    this.header("Authorization", `Bearer ${token}`);
    this.response
      .status(StatusCodes.CREATED)
      .json({ id, email, emailVerified });
  }

  async show() {
    const { accountID } = ID_VALIDATOR.parse(this.params);

    const account = await database.account.findUnique({
      where: { id: BigInt(accountID) },
      include: { names: true, formatELOs: true, matchCounts: true },
    });

    if (!account) {
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        `Couldn't find account with id: ${accountID}`
      );
    }
    const { id, names, formatELOs, matchCounts } = account;
    this.json({
      id,
      names: names.map((i) => i.value),
      elo: formatELOs
        .map(({ formatID, value, matches }) => ({
          formatID,
          value: matches < 10 ? "(Pending)" : value / Math.max(1, matches),
        }))
        .sort((a, b) => a.formatID - b.formatID),
      rates: matchCounts.map(({ formatID, type, wins, total }) => ({
        formatID,
        wins,
        type,
        total,
        rate: (wins * 100n) / BigInt(Math.max(1, Number(total))),
      })),
    });
  }
}
