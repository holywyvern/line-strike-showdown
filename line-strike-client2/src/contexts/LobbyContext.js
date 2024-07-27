import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "./ProfileContext";
import { ColyseusService } from "../services/colyseus";
import { useTabs } from "./TabContext";
import { useLink } from "./LinkContext";

export const LobbyContext = createContext(null);

export function useLobby() {
  return useContext(LobbyContext);
}

export function useLobbyState() {
  const { token } = useLink();
  const profile = useProfile();
  const [room, setRoom] = useState(null);
  const tabs = useTabs();

  useEffect(() => {
    if (!profile.name) return;

    ColyseusService.joinLobby(profile.name, token).then((room) =>
      setRoom(room)
    );
  }, [profile.name, token]);

  useEffect(() => {
    if (!room) return;

    room.onMessage("new-challenge", () => {
      tabs.notify("requests");
    });

    return () => {
      room.leave();
      setRoom((old) => {
        if (old === room) return null;

        return old;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  return room;
}
