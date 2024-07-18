import { Client } from "colyseus.js";
import { useEffect, useState } from "react";
// ...

export const client = new Client("/api");

export function useBattleRooms() {
  const [lobby, setLobby] = useState(null);
  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (lobby || ready) return;

    client.joinOrCreate("lobby").then((lobby) => {
      setLobby(lobby);
      lobby.onMessage("rooms", (rooms) => {
        setRooms([...rooms]);
      });

      lobby.onMessage("+", ([roomId, room]) => {
        setRooms((rooms) => {
          const allRooms = [...rooms];
          const roomIndex = allRooms.findIndex(
            (room) => room.roomId === roomId
          );
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
    });
  }, [lobby, ready]);
  return rooms.filter((i) => Boolean(i.metadata));
}

export default {
  async joinLobby(name) {
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
