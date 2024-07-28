import { Client } from "colyseus.js";
// ...

export const client = new Client("/api");

let lastName, lastToken, lastRoom;

export const ColyseusService = {
  get client() {
    return client;
  },
  listToBattleRooms() {
    return client.joinOrCreate("lobby");
  },
  async joinLobby(name, token = null) {
    if (lastName === name && lastToken === token) {
      return lastRoom;
    }
    const room = await client.join("showdown_lobby", { name, token });
    lastRoom = room;
    lastName = name;
    lastToken = token;
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

  queue(seat) {
    return client.consumeSeatReservation(seat);
  },
};
