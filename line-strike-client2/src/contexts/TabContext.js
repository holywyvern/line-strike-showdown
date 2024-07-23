import { createContext, useContext } from "react";
import { faHome, faBook } from '@fortawesome/free-solid-svg-icons'

export const DEFAULT_TABS = [
  {
    id: "home",
    name: "home",
    icon: faHome,
    closable: false,
    href: "/play",
  },
  {
    id: "collection",
    name: "Cards",
    icon: faBook,
    closable: false,
    href: "/play/cards"
  }
];

export const TabContext = createContext({ tabs: DEFAULT_TABS });

export function useTabs() {
  return useContext(TabContext);
}
