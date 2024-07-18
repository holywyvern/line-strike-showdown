import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { BattleView } from "./BattleView";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";
import { CardInfo } from "./CardInfo";

import { Context, HoveredCard } from "./context";

import { BattleLayout } from "../../design/BattleLayout";

export function BattlePage({ room, spectator }) {
  const [ready, setReady] = useState(false);
  const state = useState(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!room) return;
    if (!ready) return;

    return () => {
      room.leave();
    };
  }, [ready, room]);
  return (
    <HoveredCard.Provider value={state}>
      <Context.Provider value={room}>
        <BattleLayout>
          <CardInfo />
          {spectator ? <BattleView /> : <PlayArea />}
          <div
            style={{
              flex: 1,
              display: "flex",
              maxWidth: "350px",
              alignSelf: "stretch",
            }}
          >
            <Chat />
          </div>
        </BattleLayout>
      </Context.Provider>
    </HoveredCard.Provider>
  );
}

BattlePage.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
};
