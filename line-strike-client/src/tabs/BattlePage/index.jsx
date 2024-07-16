import PropTypes from "prop-types";

import { HomepageLayout } from "../../design/HomepageLayout";

import { BattleView } from "./BattleView";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";
import { CardInfo } from "./CardInfo";

import { Context } from "./context";

export function BattlePage({ room, spectator }) {
  return (
    <Context.Provider value={room}>
      <HomepageLayout>
        <CardInfo />
        {spectator ? <BattleView /> : <PlayArea />}
        <Chat />
      </HomepageLayout>
    </Context.Provider>
  );
}

BattlePage.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
};
