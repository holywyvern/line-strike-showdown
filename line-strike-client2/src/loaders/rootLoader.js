import { DatabaseService } from "../services/DatabaseService";

export async function rootLoader() {
  const database = await DatabaseService.load();
  return { database };
}
