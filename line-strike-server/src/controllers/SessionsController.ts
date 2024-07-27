import { ServerError } from "colyseus";
import { StatusCodes } from "http-status-codes";

import { database } from "../database";

import { Session } from "../validators/Session";

import { ApplicationController } from "./ApplicationController";

import { Password } from "../services/Password";
import { AuthToken } from "../services/AuthToken";
import { EmailVerification } from "../services/EmailVerification";

export class SessionsController extends ApplicationController {
  async create() {
    const { email, password, name } = await Session.parseAsync(this.body);
    const account = await database.account.findUnique({ where: { email } });
    if (!account) {
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        "Incorrect email or password"
      );
    }

    const validPassword = await Password.compare(
      password,
      account.passwordHash
    );
    if (!validPassword) {
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        "Incorrect email or password"
      );
    }

    await database.$transaction(async (tx) => {
      const field = await tx.name.findFirst({
        where: { accountID: account.id, value: name },
      });
      if (!field) {
        tx.name.create({ data: { accountID: account.id, value: name } });
      }
    });

    await EmailVerification.verify(account);

    const { id, emailVerified } = account;
    const token = await AuthToken.generate({ id, email });
    this.header("Authorization", `Bearer ${token}`);
    this.response
      .status(StatusCodes.CREATED)
      .json({ id, email, emailVerified });
  }

  async refresh() {
    const account = await this.authenticateAccount();
    const { id, email, emailVerified } = account;
    await EmailVerification.verify(account);
    const token = await AuthToken.generate({ id, email });
    this.header("Authorization", `Bearer ${token}`);
    this.response
      .status(StatusCodes.CREATED)
      .json({ id, email, emailVerified });
  }
}
