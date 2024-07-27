import { ConnectionOptions } from "bullmq";

export const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD,
} satisfies ConnectionOptions;
