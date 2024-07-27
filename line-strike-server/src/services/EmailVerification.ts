import { Account } from "@prisma/client";

import { EmailVerificationMailer } from "../mailers/EmailVerificationMailer";

import { GenerateVerificationEmail } from "../jobs/GenerateVerificationEmail";

export const EmailVerification = {
  async verify(account: Account) {
    const { id } = account;
    await GenerateVerificationEmail.add("GenerateVerificationEmail", { id });
  },
  async fakeMessage(email: string) {
    const mailer = new EmailVerificationMailer();
    await mailer.fake(email);
  },
};
