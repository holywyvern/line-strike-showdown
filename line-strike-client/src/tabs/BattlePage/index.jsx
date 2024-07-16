import { useState } from "react";
import PropTypes from "prop-types";

import { BattleView } from "./BattleView";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";
import { CardInfo } from "./CardInfo";

import { Context, HoveredCard } from "./context";

import { BattleLayout } from "../../design/BattleLayout";

export function BattlePage({ room, spectator }) {
  const state = useState(null);
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
