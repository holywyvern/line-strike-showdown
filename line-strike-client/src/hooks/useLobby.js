import { createContext, useContext } from "react";

export const Context = createContext();

export function useLobby() {
  return useContext(Context);
}
