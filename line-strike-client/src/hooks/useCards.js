import { createContext, useContext } from "react";

export const DEFAULT_STATE = { cards: [], skills: [], status: "pending" };

export const Context = createContext(DEFAULT_STATE);

export function useCards() {
  return useContext(Context);
}
