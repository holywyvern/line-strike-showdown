import { useEffect, useState } from "react";
import { WebAudio } from "../../utils/WebAudio";
import { AudioManager } from "../../utils/AudioManager";
import { useDatabase } from "../../contexts/DatabaseContext";
import { useLink } from "../../contexts/LinkContext";

const DEFAULT_DECKS = {};

const LAST_NAME_KEY = "line-strike.lastPlayer";
const LOCAL_STORAGE_KEY = "line-strike.profile.decks";

function useProfileName() {
  const { updateName, account } = useLink();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState(null);
  useEffect(() => {
    if (ready) return;

    setReady(true);
    const last = localStorage.getItem(LAST_NAME_KEY);
    if (!last) return;

    setName(last);
  }, [ready]);

  useEffect(() => {
    if (!name) return;
    if (!account) return;

    localStorage.setItem(LAST_NAME_KEY, name);

    updateName(name);
  }, [name, updateName, account]);

  return { name, setName, isLoading: !ready };
}

function useMusic(name) {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [bgm, setBGM] = useState(50);
  const [sfx, setSFX] = useState(50);
  const [notifications, setNotifications] = useState(50);
  useEffect(() => {
    if (!ready) return;
    if (!name) return;

    const str = JSON.stringify({ bgm, sfx, notifications, muted });
    localStorage.setItem(`${LOCAL_STORAGE_KEY}.${name}.music`, str);
  }, [bgm, muted, name, notifications, sfx, ready]);
  useEffect(() => {
    if (!name) return;

    try {
      const str =
        localStorage.getItem(`${LOCAL_STORAGE_KEY}.${name}.music`) || "{}";
      const saved = JSON.parse(str);
      setMuted(saved.muted || false);
      setBGM(saved.bgm || 0);
      setSFX(saved.sfx || 0);
      setNotifications(saved.notifications || 0);
      setReady(true);
    } catch (error) {
      console.error(error);
    }
  }, [name]);
  useEffect(() => {
    AudioManager.bgmVolume = bgm;
  }, [bgm]);
  useEffect(() => {
    AudioManager.seVolume = sfx;
  }, [sfx]);
  useEffect(() => {
    AudioManager.meVolume = notifications;
  }, [notifications]);
  useEffect(() => {
    if (muted) {
      WebAudio.masterVolume = 0;
    } else {
      WebAudio.masterVolume = 1;
    }
  }, [muted]);
  return {
    muted,
    toggle: () => setMuted((v) => !v),
    bgm,
    setBGM,
    sfx,
    setSFX,
    notifications,
    setNotifications,
  };
}

function useDecks(name) {
  const [deckStatus, setDeckStatus] = useState("formatting");
  const db = useDatabase();
  const [decks, setDecks] = useState(DEFAULT_DECKS);
  useEffect(() => {
    if (deckStatus !== "formatting") return;

    setDecks((decks) => {
      const oldDecks = JSON.parse(
        localStorage.getItem(`${LOCAL_STORAGE_KEY}.${name}.decks`) || "{}"
      );
      const newDecks = { ...decks, ...oldDecks };
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
  }, [decks, deckStatus, db.formats, name]);
  useEffect(() => {
    setDeckStatus("formatting");
  }, [name]);
  useEffect(() => {
    if (!decks) return;
    if (deckStatus !== "formatted") return;

    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}.${name}.decks`,
      JSON.stringify(decks)
    );
  }, [name, decks, deckStatus]);
  return { decks, isLoading: deckStatus === "formatting", setDecks };
}

export function useProfileState() {
  const { standardFormatID } = useDatabase();
  const [formatID, setFormatID] = useState(standardFormatID);
  const { name, setName, isLoading: nameLoading } = useProfileName();
  const music = useMusic(name);
  const { decks, isLoading: deckLoading, setDecks } = useDecks(name);

  return {
    name,
    music,
    decks,
    formatID,
    setFormatID,
    isLoading: nameLoading || deckLoading,
    signIn(name) {
      setName(name);
    },
    signOut() {
      setName(null);
    },
    changeDeck(formatID, index, deck) {
      setDecks((decks) => {
        const copy = { ...decks };
        copy[formatID] = [...(copy[formatID] || [])];
        copy[formatID][index] = deck;
        return copy;
      });
    },
  };
}
