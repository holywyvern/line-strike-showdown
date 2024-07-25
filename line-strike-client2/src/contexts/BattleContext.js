import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLobby } from "./LobbyContext";

import { ColyseusService } from "../services/colyseus";

import { useDatabase } from "./DatabaseContext";
import { useTabs } from "./TabContext";

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

const MESSAGE_TYPES = [
  "card-open",
  "draw",
  "win",
  "break",
  "battle-start",
  "start-turn",
];

export function useBattleRoomState() {
  const { formats } = useDatabase();
  const lobby = useLobby();
  const [rooms, setRooms] = useState({});
  const [nextRoom, setNextRoom] = useState(null);
  const navigate = useNavigate();
  const { notify } = useTabs();

  useEffect(() => {
    if (!lobby) return;

    function setRoomState(id, status) {
      setRooms((rooms) => {
        const room = rooms[id];
        if (!room) return rooms;
        if (room.status === status) return rooms;

        const newRooms = { ...rooms };
        newRooms[id] = { ...room, status };
        return newRooms;
      }, []);
    }

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
        handle.onStateChange(() => {
          setRoomState(handle.roomId, handle.state.phase);
        });
        const onNotify = () => {
          const id = `battles-${handle.roomId}`;
          notify(id);
        };
        for (const type of MESSAGE_TYPES) {
          handle.onMessage(type, onNotify);
        }
        setRooms((rooms) => ({ ...rooms, [handle.roomId]: data }));
        setNextRoom(handle.roomId);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
