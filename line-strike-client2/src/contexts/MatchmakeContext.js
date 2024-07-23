import { createContext, useContext, useEffect, useState } from "react";
import { useLobby } from "./LobbyContext";
import { useProfile } from "./ProfileContext";
import { ColyseusService } from "../services/colyseus";

export const MatchmakeContext = createContext();

export function useMatchmake() {
  return useContext(MatchmakeContext);
}

export function useMatchmakeState() {
  const lobby = useLobby();
  const { formatID } = useProfile();
  const [type, setType] = useState(null);
  const [room, setRoom] = useState(null);
  const [start, setStart] = useState(null);
  const matching = Boolean(room);
  useEffect(() => {
    if (!lobby) return;

    lobby.onMessage("queue", async (queue) => {
      if (!queue) {
        setRoom(null);
        setStart(null);
        setType(null);
        return;
      }
      const { seat, since, type } = queue;
      const room = await ColyseusService.queue(seat);
      setType(type);
      setStart(since);
      setRoom(room);
    });
  }, [lobby]);
  return {
    matching,
    type,
    start,
    unranked() {
      if (matching) return;

      lobby.send("unranked", formatID);
    },
    cancel() {
      if (!matching) return;

      room.leave();
    },
  };
}
