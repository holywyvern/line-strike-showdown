import crypto from "node:crypto";
import faker from "@faker-js/faker";
import { Worker, Queue } from "bullmq";
import { differenceInHours, differenceInMinutes } from "date-fns";

import { EmailVerificationMailer } from "../mailers/EmailVerificationMailer";

import { database } from "../database";

import { connection } from "./connection";

interface Params {
  id: bigint;
}

export const GenerateVerificationEmail = new Queue<Params>(
  "GenerateVerificationEmail",
  { connection }
);

const worker = new Worker<Params>(
  "GenerateVerificationEmail",
  async (job) => {
    const { id } = job.data;
    const mailer = new EmailVerificationMailer();
    let account = await database.account.findUniqueOrThrow({ where: { id } });
    if (account.emailVerified) return;

    const now = new Date();
    const hours = Math.abs(differenceInHours(account.verificationSentAt, now));
    const minutes = Math.abs(differenceInMinutes(account.verificationSentAt, now));
    if (hours >= 24 || account.emailVerificationToken === null) {
      const emailVerificationToken = crypto.randomBytes(64).toString("hex");
      job.log(`Generating new verification token... ${emailVerificationToken}`)
      account = await database.account.update({
        where: { id },
        data: {
          emailVerificationToken,
          verificationSentAt: new Date(),
        },
      });
    }
    if (process.env.NODE_ENV !== "production" || minutes >= 5) {
      job.log("Sending verification email...");
      await mailer.verification(account);
      account = await database.account.update({
        where: { id },
        data: {
          verificationSentAt: new Date(),
        },
      });
    }
  },
  { connection }
);

GenerateVerificationEmail.on("error", (err) => {
  console.error(`Job failed: ${err.message}`);
});

worker.on("completed", (job) => {
  if (process.env.NODE_ENV === "production") return;

  console.log(`${job.id} has completed sending verification email!`);
});

worker.on("failed", (job, err) => {
  if (process.env.NODE_ENV === "production") return;
  
  console.log(`${job.id} has failed sending verification email with ${err.message}`);
});
