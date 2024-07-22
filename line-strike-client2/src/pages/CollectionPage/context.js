import { createContext, useContext } from "react";

export const CollectionContext = createContext();

export function useFilteredCollection() {
  return useContext(CollectionContext);
}
