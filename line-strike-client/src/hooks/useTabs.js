import { createContext, useContext } from "react";

export const Context = createContext();

export function useTabs() {
  return useContext(Context);
}