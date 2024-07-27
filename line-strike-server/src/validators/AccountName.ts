import { z } from "zod";

export const AccountName = z.object({
  name: z.string().min(1).max(32),
});
