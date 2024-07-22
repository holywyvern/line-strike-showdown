import { createContext, useContext } from "react";

export const ProfileContext = createContext({
  status: "pending",
  name: "",
  decks: {},
});

export function useProfile() {
  return useContext(ProfileContext);
}
