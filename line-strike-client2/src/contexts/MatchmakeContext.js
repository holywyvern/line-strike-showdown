import { createContext, useContext, useEffect, useState } from "react";
import { useLobby } from "./LobbyContext";
import { useProfile } from "./ProfileContext";
import { ColyseusService } from "../services/colyseus";
import { useLink } from "./LinkContext";

export const MatchmakeContext = createContext();

export function useMatchmake() {
  return useContext(MatchmakeContext);
}

export function useMatchmakeState() {
  const lobby = useLobby();
  const { account } = useLink();
  const { formatID } = useProfile();
  const [type, setType] = useState(null);
  const [room, setRoom] = useState(null);
  const [start, setStart] = useState(null);
  const matching = Boolean(room && start && type);
  useEffect(() => {
    if (!lobby) return;

    const clear = () => {
      setRoom(() => null);
      setStart(() => null);
      setType(() => null);
    };

    lobby.onMessage("remove-queue", clear);

    lobby.onMessage("queue", async (queue) => {
      if (!queue) {
        clear();
        return;
      }
      const { seat, since, type } = queue;
      const room = await ColyseusService.queue(seat);
      room.onLeave(clear);
      setType(() => type);
      setStart(() => since);
      setRoom(() => room);
    });
  }, [lobby]);
  return {
    matching,
    type,
    start,
    ranked() {
      if (matching) return;
      if (!account) return;

      lobby.send("ranked", formatID);
    },
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
