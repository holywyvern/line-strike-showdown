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
    if (profile.isLoading) return;
    if (!profile.name) return;

    let newRoom = null;

    ColyseusService.joinLobby(profile.name).then((room) => {
      newRoom = room;
      setRoom(room);
    });
    return () => {
      newRoom?.leave?.();
      setRoom(null);
    };
  }, [profile.name, profile.isLoading]);

  return room;
}
