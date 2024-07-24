import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLobby } from "./LobbyContext";

import { ColyseusService } from "../services/colyseus";

import { useDatabase } from "./DatabaseContext";

export const BattleContext = createContext({ rooms: {} });

export function useBattleRooms() {
  return useContext(BattleContext);
}

const BATTLE_TYPES = {};

const EMPTY_ROOM = {
  spectator: true,
  title: "Finding Room...",
  status: "loading",
};

const ERROR_ROOM = {
  spectator: true,
  title: "Error: Room not found",
  status: "error",
};

export function useBattleRoomState() {
  const { formats } = useDatabase();
  const lobby = useLobby();
  const [rooms, setRooms] = useState({});
  const [nextRoom, setNextRoom] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!lobby) return;

    lobby.onMessage("battle-error", (roomId) => {
      setRooms((rooms) => ({ ...rooms, [roomId]: ERROR_ROOM }));
    });

    lobby.onMessage(
      "battle",
      async ({
        challenged,
        challenger,
        seat,
        opponent,
        type,
        formatID,
        spectator,
      }) => {
        const title = `${
          spectator
            ? `${challenger.name} vs ${challenged.name}`
            : `Vs ${opponent}`
        } (${BATTLE_TYPES[type] || "Free Battle"}) [${formats[formatID].name}]`;
        const handle = await ColyseusService.joinBattle(seat);
        const data = { handle, spectator, title, status: "ready" };
        setRooms((rooms) => ({ ...rooms, [handle.sessionId]: data }));
        setNextRoom(handle.sessionId);
      }
    );
  }, [lobby, formats]);
  useEffect(() => {
    if (!nextRoom) return;

    navigate(`/play/battles/${nextRoom}`);
    setNextRoom(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextRoom]);
  return {
    rooms,
    addRoom(id, data) {
      setRooms((rooms) => ({ ...rooms, [id]: data }));
    },
    leaveRoom(id) {
      setRooms((rooms) => {
        if (!rooms[id]) return rooms;

        const newRooms = { ...rooms };
        const data = newRooms[id];
        if (data.handle) {
          data.handle.leave(true);
        }
        delete newRooms[id];
        return newRooms;
      });
    },
  };
}

export function useBattleRoomData(id) {
  const lobby = useLobby();
  const { rooms, addRoom } = useBattleRooms();
  const room = rooms[id];
  useEffect(() => {
    if (!lobby) return;
    if (room) return;

    addRoom(id, EMPTY_ROOM);
    lobby.send("spectate", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, id, lobby]);
  return room || EMPTY_ROOM;
}
