import { Request, Response, NextFunction } from "express";

import { ApplicationController } from "./ApplicationController";

export type Controller<T> = {
  new (request: Request, response: Response): T;
};

export type Callback = () => Promise<unknown>;

type Action<T> = {
  [P in keyof T]: T[P] extends Callback ? P : never;
}[keyof T];

export function action<T>(controller: Controller<T>, key: Action<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance = new controller(req, res);
      await (instance[key] as Callback)();
      next();
    } catch (error) {
      next(error);
    }
  };
}
