import { createContext, useContext, useEffect, useState } from "react";

import { AudioManager } from "../../../utils/AudioManager";

export const TabAudioContext = createContext();

const playBgm = AudioManager.playBgm.bind(AudioManager);
const playBgs = AudioManager.playBgs.bind(AudioManager);
const playMe = AudioManager.playMe.bind(AudioManager);
const playSe = AudioManager.playSe.bind(AudioManager);

function useMusicPlayer(player, active) {
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!active) return;
    if (!name) return;

    player({ name, volume: 100 });
    setName(null);
  }, [player, name, active]);
  return setName;
}

export function useTabAudio() {
  const active = useContext(TabAudioContext);
  const bgm = useMusicPlayer(playBgm, active);
  const bgs = useMusicPlayer(playBgs, active);
  const me = useMusicPlayer(playMe, active);
  const se = useMusicPlayer(playSe, active);
  const audio = { bgm, bgs, me, se };

  return audio;
}
