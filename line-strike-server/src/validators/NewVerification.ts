import { z } from "zod";

export const NewVerification = z.object({ email: z.string().email() });
