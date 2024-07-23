import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "./ProfileContext";
import { ColyseusService } from "../services/colyseus";

export const LobbyContext = createContext(null);

export function useLobby() {
  return useContext(LobbyContext);
}

export function useLobbyState() {
  const profile = useProfile();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    if (!profile.name) return;

    ColyseusService.joinLobby(profile.name).then((room) => setRoom(room));
  }, [profile.name]);

  useEffect(() => {
    if (!room) return;

    return () => {
      room.leave();
      setRoom((old) => {
        if (old === room) return null;

        return old;
      });
    };
  }, [room]);
  return room;
}
