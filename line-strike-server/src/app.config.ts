import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

/**
 * Import your Room files
 */
import { LineStrikeRoom } from "./rooms/LineStrikeRoom";
import { Card, CardElement } from "./rooms/schema/Card";
import { LobbyRoom } from "./rooms/LobbyRoom";
import { matchMaker, LobbyRoom as ColyseusLobbyRoom } from "colyseus";
import { SECRET_LOBBY_KEY } from "./utils/keys";
import { Skill } from "./rooms/schema/Skill";
import { Format } from "./rooms/schema/Format";
import { UnrankedMatcherRoom } from "./rooms/UnrankedMatcherRoom";

interface Comparable {
  name: string;
  element: CardElement;
  ppCost: number;
}

const ELEMENT_SCORE: { [K in CardElement]: number } = {
  fire: 100_000_000,
  ice: 200_000_000,
  wind: 300_000_000,
  lightning: 400_000_000,
  light: 500_000_000,
  darkness: 600_000_000,
};

function cardScore(self: Comparable, other: Comparable): number {
  const names = (1 + self.name.localeCompare(other.name)) * 100_000;
  const pp = self.ppCost * 1_000_000;
  return pp + ELEMENT_SCORE[self.element] + names;
}

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
    app.get("/cards", (req, res) => {
      const cards = Card.COLLECTION.map((card) => {
        if (!card) return null;

        return {
          ...card,
          skill: {
            id: card.skill.id,
            name: card.skill.name,
            description: card.skill.description,
          },
        };
      });
      const collection = cards.filter(Boolean);
      collection.sort((b: any, a: any) => cardScore(b, a) - cardScore(a, b));

      res.json({
        cards,
        collection: collection.map((i) => i.id),
        skills: Skill.COLLECTION,
        formats: Format.COLLECTION,
        standardFormatID: Format.STANDARD_ID,
      });
    });

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
    LobbyRoom.instance = await matchMaker.createRoom("showdown_lobby", {
      __secret_lobby_key__: SECRET_LOBBY_KEY,
    });
  },
});
