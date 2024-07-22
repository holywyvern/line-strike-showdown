import { useEffect, useMemo, useState } from "react";
import { WebAudio } from "../../utils/WebAudio";
import { AudioManager } from "../../utils/AudioManager";
import { useDatabase } from "../../contexts/DatabaseContext";

const DEFAULT_DECKS = {};

const LAST_NAME_KEY = "line-strike.lastPlayer";
const LOCAL_STORAGE_KEY = "line-strike.profile.decks";

function useMusic() {
  const [playMusic, setPlayMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0);
  const music = useMemo(
    () => ({
      play: playMusic,
      get volume() {
        return musicVolume;
      },
      set volume(value) {
        const v = value / 100;
        WebAudio.masterVolume = v * v;
        setMusicVolume(value);
      },
      toggle() {
        setPlayMusic((v) => {
          if (v) {
            AudioManager.generalVolume = 0;
          } else {
            AudioManager.generalVolume = 100;
          }
          return !v;
        });
      },
    }),
    [musicVolume, playMusic]
  );
  return { music, setPlayMusic, setMusicVolume };
}

function useDecks(status) {
  const [deckStatus, setDeckStatus] = useState("formatting");
  const db = useDatabase();
  const [decks, setDecks] = useState(DEFAULT_DECKS);
  useEffect(() => {
    if (status !== "loaded") return;
    if (deckStatus !== "formatting") return;

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
  return [decks, setDecks];
}

function useProfileLoader(
  setDecks,
  setMusicVolume,
  setPlayMusic,
  setName,
  setStatus,
  setError
) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    setReady(true);
    setStatus("loaded");
    const last = localStorage.getItem(LAST_NAME_KEY);
    if (!last) return;

    try {
      setName(last);
      const data = JSON.parse(
        localStorage.getItem(`${LOCAL_STORAGE_KEY}.${last}`) || "{}"
      );
      setDecks(data.decks || {});
      setPlayMusic(data.music || false);
      const v = data.volume || 0;
      setMusicVolume(v);
      WebAudio.masterVolume = v * v;
      AudioManager.generalVolume = data.music ? 100 : 0;
    } catch (error) {
      console.error(error);
      setStatus("error");
      setError(error);
    }
  }, [
    ready,
    setDecks,
    setError,
    setMusicVolume,
    setName,
    setPlayMusic,
    setStatus,
  ]);
}

function useProfileSaver(name, decks, status, music) {
  useEffect(() => {
    if (status !== "loaded") return;
    if (!name) return;

    localStorage.setItem(LAST_NAME_KEY, name);
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}.${name}`,
      JSON.stringify({ name, decks, music: music.play, volume: music.volume })
    );
  }, [name, decks, status, music.play, music.volume]);
}

export function useProfileState() {
  const { standardFormatID } = useDatabase();
  const [formatID, setFormatID] = useState(standardFormatID);
  const [status, setStatus] = useState("pending");
  const [name, setName] = useState(null);
  const [decks, setDecks] = useDecks(status);
  const [error, setError] = useState(null);
  const { music, setPlayMusic, setMusicVolume } = useMusic();
  const api = {
    name,
    decks,
    error,
    music,
    formatID,
    isLoading: status === "pending",
    isError: status === "error",
    isSignedIn: status === "logged-in",
    changeFormat(id) {
      setFormatID(id);
    },
    signIn(name) {
      setName(name);
    },
    signOut() {
      setName(null);
    },
  };
  useProfileLoader(
    setDecks,
    setMusicVolume,
    setPlayMusic,
    setName,
    setStatus,
    setError
  );
  useProfileSaver(name, decks, status, music);
  return api;
}
