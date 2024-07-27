import { z } from "zod";

export const Account = z.object({
  name: z.string().min(1).max(32),
  email: z.string().min(1).max(250).email(),
  password: z.string().min(8).max(52),
});
