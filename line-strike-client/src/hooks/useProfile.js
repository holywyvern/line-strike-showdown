import { createContext, useContext } from "react";

export const Context = createContext();

export function useProfile() {
  return useContext(Context);
}
