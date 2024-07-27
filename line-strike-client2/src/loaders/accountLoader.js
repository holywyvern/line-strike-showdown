import { AccountService } from "../services/AccountServices";

export async function accountLoader({ params }) {
  return AccountService.show(params.accountID);
}
