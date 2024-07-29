import { AccountService } from "../services/AccountServices";

export async function matchLoader({ params }) {
  return AccountService.matches(params.accountID);
}
