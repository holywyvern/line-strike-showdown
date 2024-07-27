import { Worker, Queue } from "bullmq";
import nodemailer from "nodemailer";
import { z } from "zod";

import { Email } from "../validators/Email";

import { connection } from "./connection";

const transporter = nodemailer.createTransport({
  host: String(process.env.SMTP_HOST),
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: Boolean(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as any);

export const SendEmail = new Queue<z.infer<typeof Email>>("SendEmail", {
  connection,
});

const worker = new Worker<z.infer<typeof Email>>(
  "SendEmail",
  async (job) => {
    console.log(`Sending email to ${job.data.to}`);
    await transporter.sendMail(await Email.parseAsync(job.data));
    console.log(`Email sent to to ${job.data.to}`);
  },
  { connection }
);

SendEmail.on("error", (err) => {
  console.error(`Job failed: ${err.message}`);
});

worker.on("completed", (job) => {
  if (process.env.NODE_ENV === "production") return;

  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
