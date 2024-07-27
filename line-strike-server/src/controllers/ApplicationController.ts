import { ServerError } from "colyseus";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthToken } from "../services/AuthToken";
import { database } from "../database";

export class ApplicationController {
  request: Request;
  response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  json(data: any) {
    this.response.json(data);
  }

  get body() {
    return this.request.body || {};
  }

  get query() {
    return this.request.query || {};
  }

  get params() {
    return this.request.params || {};
  }

  header(key: string, value: string | number | readonly string[]) {
    this.response.setHeader(key, value);
  }

  private async findAuthToken() {
    const header = this.request.header("Authorization");
    if (!header) {
      throw new ServerError(
        StatusCodes.UNAUTHORIZED,
        "Authorization token not set"
      );
    }

    const [_, token] = header.split(" ");
    if (!token) {
      throw new ServerError(
        StatusCodes.UNAUTHORIZED,
        "Invalid autherization token"
      );
    }
    return token;
  }

  async authenticateAccount() {
    const token = await this.findAuthToken();
    const { id } = await AuthToken.verify(token);
    const account = await database.account.findUnique({ where: { id } });
    if (!account)
      throw new ServerError(StatusCodes.UNAUTHORIZED, "Account not found");
    return account;
  }
}
