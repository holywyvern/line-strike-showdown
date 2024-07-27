import { z } from "zod";

import { Email } from "../validators/Email";
import { SendEmail } from "../jobs/SendEmail";

export class ApplicationMailer {
  from?: string;
  subject?: string;

  async send(data: Partial<z.infer<typeof Email>>) {
    const email = { ...data };
    email.from ||= this.from;
    email.subject ||= this.subject;
    await SendEmail.add("SendEmail", email);
  }
}
