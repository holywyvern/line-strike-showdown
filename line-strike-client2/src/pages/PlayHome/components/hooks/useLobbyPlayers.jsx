import { useEffect, useMemo, useState } from "react";

import { useLobby } from "../../../../contexts/LobbyContext";

export function useLobbyPlayers() {
  const [players, setPlayers] = useState({});
  const lobby = useLobby();
  const playerList = useMemo(
    () => [...Object.values(players)].filter(Boolean),
    [players]
  );
  useEffect(() => {
    if (!lobby) return;

    const keys = lobby.state.players.keys();
    setPlayers(
      Object.fromEntries(keys.map((key) => [key, lobby.state.players[key]]))
    );

    lobby.state.players.onAdd((item, key) => {
      setPlayers((players) => {
        const newPlayers = { ...players };
        newPlayers[key] = item;
        return newPlayers;
      });
    });
    lobby.state.players.onRemove((_item, key) => {
      setPlayers((players) => {
        const newPlayers = { ...players };
        delete newPlayers[key];
        return newPlayers;
      });
    });
  }, [lobby]);
  return playerList;
}
