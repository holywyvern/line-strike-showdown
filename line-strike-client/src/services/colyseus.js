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

    return client.join("showdown_lobby", { name });
  },
  joinBattle(seat) {
    return client.consumeSeatReservation(seat);
  },
};
