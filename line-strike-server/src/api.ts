import { ServerError } from "colyseus";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";

import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

import { NextFunction, Request, Response, Router } from "express";

import { action } from "./controllers/action";

import { DatabaseController } from "./controllers/DatabaseController";
import { AccountsController } from "./controllers/AccountsController";
import { SessionsController } from "./controllers/SessionsController";
import { VerificationController } from "./controllers/VerificationsController";
import { AccountNamesController } from "./controllers/AccountNamesController";

export function createApi() {
  const api = Router();

  api.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  api.get("/cards", action(DatabaseController, "index"));
  api.get("/database", action(DatabaseController, "index"));

  api.post("/accounts/new-name", action(AccountNamesController, "create"));
  api.post("/accounts/sign-in", action(SessionsController, "create"));
  api.post("/accounts/refresh", action(SessionsController, "refresh"));
  api.post("/accounts", action(AccountsController, "create"));

  api.post("/email/verifications", action(VerificationController, "create"));
  api.get(
    "/email/verifications/:emailVerificationToken",
    action(VerificationController, "show")
  );

  api.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ServerError) {
      return res
        .status(err.code)
        .json({ code: err.code, message: err.message });
    }
    if (err instanceof ZodError) {
      const validation = fromError(err);
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        code: StatusCodes.UNPROCESSABLE_ENTITY,
        message: validation.toString(),
      });
    }
    if (err instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
    if (typeof err === "string") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ code: StatusCodes.INTERNAL_SERVER_ERROR, message: err });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  });

  return api;
}
