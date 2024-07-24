import { Outlet } from "react-router-dom";

import { useEffect } from "react";

import { useTabs } from "../../contexts/TabContext";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "./design/Layout";

import {
  DeckBuilderFormatContext,
  useDeckBuilderFormatFinder,
} from "./context";

import { FormatSelector } from "./components/FormatSelector";

const DECK_BUILDER_TAB = {
  id: "decks",
  name: "Decks",
  icon: faEdit,
  closable: true,
  href: "/play/decks",
  match: /^\/play\/decks(.*?)*$/iu,
};

export function DeckBuilderLayout() {
  const format = useDeckBuilderFormatFinder();
  const tabs = useTabs();
  useEffect(() => {
    tabs.ensure(DECK_BUILDER_TAB);
  });
  return (
    <DeckBuilderFormatContext.Provider value={format}>
      <Layout>
        <FormatSelector />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </DeckBuilderFormatContext.Provider>
  );
}
