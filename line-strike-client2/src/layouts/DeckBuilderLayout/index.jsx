import { Outlet } from "react-router-dom";

import { useEffect } from "react";

import { useTabs } from "../../contexts/TabContext";

import { faEdit } from "@fortawesome/free-solid-svg-icons";

const DECK_BUILDER_TAB = {
  id: "decks",
  name: "Decks",
  icon: faEdit,
  closable: true,
  href: "/play/decks",
};

export function DeckBuilderLayout() {
  const tabs = useTabs();
  useEffect(() => {
    tabs.ensure(DECK_BUILDER_TAB);
  });
  return <Outlet />;
}
