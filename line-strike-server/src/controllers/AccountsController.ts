import { StatusCodes } from "http-status-codes";

import { database } from "../database";

import { ApplicationController } from "./ApplicationController";

import { Account } from "../validators/Account";

import { EmailVerification } from "../services/EmailVerification";
import { AuthToken } from "../services/AuthToken";
import { Password } from "../services/Password";
import { z } from "zod";
import { ServerError } from "colyseus";

const ID_VALIDATOR = z.object({ accountID: z.string() });

export class AccountsController extends ApplicationController {
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
      include: { names: true },
    });

    if (!account) {
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        `Couldn't find account with id: ${accountID}`
      );
    }
    const { id, names } = account;
    this.json({ id, names: names.map((i) => i.value) });
  }
}
