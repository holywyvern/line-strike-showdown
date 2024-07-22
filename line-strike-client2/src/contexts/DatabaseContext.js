import { createContext, useContext } from "react";

export const DatabaseContext = createContext({
  cards: [],
  skills: [],
  formats: [],
});

export function useDatabase() {
  return useContext(DatabaseContext);
}
