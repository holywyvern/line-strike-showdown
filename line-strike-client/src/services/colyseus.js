import { Client } from "colyseus.js";
import { useEffect, useState } from "react";
// ...

export const client = new Client("/api");

let lobby = null;

export function useBattleRooms() {
  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (ready) return;
    if (!lobby) return;

    lobby.onMessage("+", ([roomId, room]) => {
      setRooms((rooms) => {
        const allRooms = [...rooms];
        const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
        if (roomIndex !== -1) {
          allRooms[roomIndex] = { ...room };
        } else {
          allRooms.push(room);
        }
        return allRooms;
      });
    });

    lobby.onMessage("-", (roomId) => {
      setRooms((rooms) => rooms.filter((room) => room.roomId !== roomId));
    });
    setReady(true);
  }, [ready]);
  return rooms;
}

export default {
  async joinLobby(name) {
    lobby = await client.joinOrCreate("lobby");

    const room = await client.join("showdown_lobby", { name });
    return new Promise((resolve) => {
      room.onStateChange.once(() => resolve(room));
    });
  },
  async joinBattle(seat) {
    const room = await client.consumeSeatReservation(seat);
    return new Promise((resolve) => {
      const onAllJoin = (state) => {
        if (state.playerA && state.playerB) {
          room.onStateChange.remove(onAllJoin);
          resolve(room);
        }
      };
      room.onStateChange(onAllJoin);
    });
  },
};
