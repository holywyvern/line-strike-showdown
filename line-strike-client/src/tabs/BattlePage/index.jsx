import PropTypes from "prop-types";

import { BattleView } from "./BattleView";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";
import { CardInfo } from "./CardInfo";

import { Context } from "./context";
import { BattleLayout } from "../../design/BattleLayout";

export function BattlePage({ room, spectator }) {
  return (
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
  );
}

BattlePage.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
};
