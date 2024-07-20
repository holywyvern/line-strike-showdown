import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useCards } from "../hooks/useCards";

import { AudioManager } from "../utils/AudioManager";
import { WebAudio } from "../utils/WebAudio";
import { Context } from "../hooks/useProfile";

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
  const [music, setMusic] = useState(false);
  const [volume, setVolume] = useState(100);
  const api = {
    name,
    music,
    format: db.formats?.[formatID],
    decks: decks[formatID] || [],
    allDecks: decks,
    status,
    volume,
    setVolume(value) {
      const v = value / 100;
      WebAudio.masterVolume = v * v;
      setVolume(value);
    },
    toggleMusic() {
      setMusic((v) => {
        AudioManager.bgmVolume = v ? 0 : 100;
        return !v;
      });
    },
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
    setMusic(saved.music || false);
    api.setVolume(saved.volume || 0);
    setStatus("loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Saves the profile on changes for future visits
  useEffect(() => {
    if (status !== "loaded") return;

    localStorage.setItem(LAST_NAME_KEY, name);
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}.${name}`,
      JSON.stringify({ name, decks, formatID, music, volume })
    );
  }, [name, decks, status, music, volume, formatID]);
  return <Context.Provider value={api}>{children}</Context.Provider>;
}

ProfileContext.propTypes = {
  children: PropTypes.node,
};
