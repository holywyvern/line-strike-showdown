import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCards } from "../hooks/useCards";

const Context = createContext();

function useProfile() {
  return useContext(Context);
}

const LAST_NAME_KEY = "line-strike.lastPlayer";
const LOCAL_STORAGE_KEY = "line-strike.profile.decks";

const DEFAULT_FORMAT = 1;

export function ProfileContext({ children }) {
  const db = useCards();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("loading");
  const [deckStatus, setDeckStatus] = useState("formatting");
  const [formatID, setFormatID] = useState(DEFAULT_FORMAT);
  const [decks, setDecks] = useState({});
  const api = {
    name,
    format: db.formats?.[formatID],
    decks: decks[formatID] || [],
    allDecks: decks,
    status,
    changeName(name) {
      setName(name);
    },
    changeDeck(formatID, index, deck) {
      setDecks((decks) => {
        const copy = { ...decks };
        copy[formatID] = [...(copy[formatID] || [])];
        copy[formatID][index] = deck;
        return copy;
      });
    },
    isLoaded: status === "loaded" && deckStatus === "formatted",
    isLoading: status === "pending",
    isError: status === "error",
    formatID,
    setFormatID,
  };
  useEffect(() => {
    if (status !== "loaded") return;
    if (deckStatus !== "formatting") return;
    if (!db.isLoaded) return;

    setDecks((decks) => {
      const newDecks = { ...decks };
      for (const format of db.formats.filter(Boolean)) {
        const formatDecks = [...(newDecks[format.id] || [])];
        newDecks[format.id] = formatDecks;
        while (decks.length > format.maxDecks) {
          formatDecks.pop();
        }
        while (formatDecks.length < format.maxDecks) {
          formatDecks.push({
            name: `Deck ${formatDecks.length + 1}`,
            format: format.id,
            cards: format.defaultDeck,
            playmat: "blue_basic.webp",
            sleeve: "blue_basic.webp",
            playmatOpacity: 100,
          });
        }
      }
      return newDecks;
    });
    setDeckStatus("formatted");
  }, [decks, deckStatus, status, db.isLoaded, db.formats]);
  // Loads stored profile configuration
  useEffect(() => {
    const lastName = localStorage.getItem(LAST_NAME_KEY) || "";
    const json =
      localStorage.getItem(`${LOCAL_STORAGE_KEY}.${lastName}`) || "{}";
    const saved = JSON.parse(json);
    setName(lastName);
    setDecks(saved.decks || {});
    setFormatID(json.formatID || DEFAULT_FORMAT);
    setStatus("loaded");
  }, []);
  // Saves the profile on changes for future visits
  useEffect(() => {
    if (status !== "loaded") return;

    localStorage.setItem(LAST_NAME_KEY, name);
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}.${name}`,
      JSON.stringify({ name, decks, formatID })
    );
  }, [name, decks, status, formatID]);
  return <Context.Provider value={api}>{children}</Context.Provider>;
}

ProfileContext.hook = useProfile;

ProfileContext.propTypes = {
  children: PropTypes.node,
};
