import { createContext, useContext } from "react";

export const Context = createContext();

export function useAssets() {
  return useContext(Context);
}
