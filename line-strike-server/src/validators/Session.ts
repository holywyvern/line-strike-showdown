import { z } from "zod";

export const Session = z.object({
  name: z.string().min(1).max(32),
  email: z.string().email(),
  password: z.string(),
});
