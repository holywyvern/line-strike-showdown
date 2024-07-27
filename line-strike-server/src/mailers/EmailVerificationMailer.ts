import { Account } from "@prisma/client";
import { ApplicationMailer } from "./ApplicationMailer";

export class EmailVerificationMailer extends ApplicationMailer {
  from = "noreply@linestrike.ar";
  subject = "Mail Verification";

  async verification(account: Account) {
    const html = `
    <p>Hello there!</p>
    <p>This is an email sent by LINE STRIKE SHOWDOWN!'s verification system.</p>
    <p>To verify your account, enter the following verification code on the website:</p>
    <br />
    <p>${account.emailVerificationToken}</p>
    <br />
    <p>If you never register to LINE STRIKE SHOWDOWN! please ignore this email.</p>
    `;
    return this.send({ to: account.email, html });
  }

  async fake(to: string) {
    const html = `
    <p>Hello there!</p>
    <p>This is an email sent by LINE STRIKE SHOWDOWN!'s verification system.</p>
    <p>If you never register to LINE STRIKE SHOWDOWN! please ignore this email.</p>
    <p>Sorry, but this email has no account associated to LINE STRIKE SHOWDOWN!</p>
    <p>Check your email address and try again.</p>
    `;
    return this.send({ to, html });
  }
}
