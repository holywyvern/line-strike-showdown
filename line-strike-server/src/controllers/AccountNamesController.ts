import { database } from "../database";

import { AccountName } from "../validators/AccountName";

import { ApplicationController } from "./ApplicationController";

export class AccountNamesController extends ApplicationController {
  async create() {
    const account = await this.authenticateAccount();
    const { name } = await AccountName.parseAsync(this.body);
    await database.$transaction(async (tx) => {
      const field = await tx.name.findFirst({
        where: { accountID: account.id, value: name },
      });
      if (!field) {
        await tx.name.create({ data: { accountID: account.id, value: name } });
      }
    });
    this.response.json("");
  }
}
