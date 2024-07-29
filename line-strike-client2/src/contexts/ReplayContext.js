import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLobby } from "./LobbyContext";

import { ColyseusService } from "../services/colyseus";

import { useDatabase } from "./DatabaseContext";

export const ReplayContext = createContext({ rooms: {} });

export function useReplayRooms() {
  return useContext(ReplayContext);
}

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

export function useReplayRoomState() {
  const { formats } = useDatabase();
  const lobby = useLobby();
  const [rooms, setRooms] = useState({});
  const [nextRoom, setNextRoom] = useState(null);
  const navigate = useNavigate();

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
      "replay",
      async ({ challenged, challenger, seat, formatID }) => {
        const title = `${challenger.name} vs ${challenged.name} (Replay) [${formats[formatID].name}]`;
        const handle = await ColyseusService.joinBattle(seat);
        const data = { handle, spectator: true, title, status: "ready" };
        handle.onStateChange(() => {
          setRoomState(handle.roomId, handle.state.phase);
        });
        setRooms((rooms) => ({ ...rooms, [handle.roomId]: data }));
        setNextRoom(handle.roomId);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby, formats]);
  useEffect(() => {
    if (!nextRoom) return;

    navigate(`/play/replays/${nextRoom}`);
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

export function useReplayRoomData(id) {
  const lobby = useLobby();
  const { rooms, addRoom } = useReplayRooms();
  const room = rooms[id];
  useEffect(() => {
    if (!lobby) return;
    if (room) return;

    addRoom(id, EMPTY_ROOM);
    lobby.send("replay", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, id, lobby]);
  return room || EMPTY_ROOM;
}
