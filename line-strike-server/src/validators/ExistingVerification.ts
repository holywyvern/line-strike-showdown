import { z } from "zod";

export const ExistingVerification = z.object({ emailVerificationToken: z.string() });
