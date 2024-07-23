import { useEffect, useState } from "react";
import { ColyseusService } from "../services/colyseus";

export function useBattleRooms() {
  const [lobby, setLobby] = useState(null);
  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (lobby || ready) return;

    ColyseusService.listToBattleRooms().then((lobby) => {
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
