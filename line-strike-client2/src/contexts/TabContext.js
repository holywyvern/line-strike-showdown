import { createContext, useContext } from "react";
import { faHome, faBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const DEFAULT_TABS = [
  {
    id: "home",
    name: "Home",
    icon: faHome,
    closable: false,
    href: "/play",
  },
  {
    id: "collection",
    name: "Cards",
    icon: faBook,
    closable: false,
    href: "/play/cards",
  },
  {
    id: "requests",
    name: "Requests",
    icon: faEnvelope,
    closable: false,
    href: "/play/requests",
  },
];

export const TabContext = createContext({ tabs: DEFAULT_TABS });

export function useTabs() {
  return useContext(TabContext);
}
