import "dotenv/config";

import "./big-int";

import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import type { Request, Response } from "express";

/**
 * Import your Room files
 */
import { LineStrikeRoom } from "./rooms/LineStrikeRoom";
import { LobbyRoom } from "./rooms/LobbyRoom";
import { UnrankedMatcherRoom } from "./rooms/UnrankedMatcherRoom";

import { matchMaker, LobbyRoom as ColyseusLobbyRoom } from "colyseus";

import { SECRET_LOBBY_KEY } from "./utils/keys";

import { createApi } from "./api";
import { database } from "./database";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define("lobby", ColyseusLobbyRoom);
    gameServer
      .define("free_line_strike", LineStrikeRoom)
      .enableRealtimeListing();
    gameServer.define("showdown_lobby", LobbyRoom);
    gameServer.define("unranked", UnrankedMatcherRoom).filterBy(["formatID"]);
  },

  initializeExpress: (app) => {
    app.use(createApi());

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  async beforeListen() {
    await database.$connect();
    LobbyRoom.instance = await matchMaker.createRoom("showdown_lobby", {
      __secret_lobby_key__: SECRET_LOBBY_KEY,
    });
  },
});
