import { StatusCodes } from "http-status-codes";
import { database } from "../database";
import { NewVerification } from "../validators/NewVerification";
import { ApplicationController } from "./ApplicationController";
import { EmailVerification } from "../services/EmailVerification";
import { ExistingVerification } from "../validators/ExistingVerification";
import { ServerError } from "colyseus";
import { differenceInHours } from "date-fns";

export class VerificationController extends ApplicationController {
  async create() {
    const { email } = await NewVerification.parseAsync(this.body);
    const account = await database.account.findUnique({ where: { email } });
    if (!account) {
      EmailVerification.fakeMessage(email);
      return this.response.status(StatusCodes.CREATED).json({
        message: "A mail has been sent to your email address.",
      });
    }
    await EmailVerification.verify(account);
    return this.response.status(StatusCodes.CREATED).json({
      message: "A mail has been sent to your email address.",
    });
  }

  async show() {
    const { emailVerificationToken } = await ExistingVerification.parseAsync(
      this.params
    );
    const account = await database.account.findUnique({
      where: { emailVerificationToken },
    });
    if (!account) {
      throw new ServerError(StatusCodes.NOT_FOUND, "Account not found");
    }
    if (differenceInHours(account.verificationSentAt, new Date()) >= 24) {
      throw new ServerError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Verification token expired"
      );
    }
    await database.account.update({
      where: { id: account.id },
      data: {
        emailVerificationToken: null,
        emailVerified: true,
        verificationSentAt: null,
      },
    });
    this.response.status(StatusCodes.OK).json({ message: "Account verified" });
  }
}
