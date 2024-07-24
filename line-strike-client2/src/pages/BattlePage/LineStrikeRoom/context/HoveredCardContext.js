import { createContext, useContext } from "react";

export const HoveredContext = createContext([null, () => {}]);

export function useHoveredCard() {
  return useContext(HoveredContext);
}
