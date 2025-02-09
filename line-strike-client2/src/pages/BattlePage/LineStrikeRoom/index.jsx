import PropTypes from "prop-types";

import { LineStrikeRoomContext } from "./context";

import { PhaseChecker } from "./components/PhaseChecker";
import { HoveredContext } from "./context/HoveredCardContext";
import { useState } from "react";
import { ChatDrawer } from "./components/ChatDrawer";
import { TabAudioContext } from "./context/TabAudioContext";
import { ReplayChecker } from "./components/ReplayChecker";

export function LineStrikeRoom({ room, spectator, tabIndex, tabActive }) {
  const hovered = useState(null);
  return (
    <TabAudioContext.Provider value={tabActive}>
      <HoveredContext.Provider value={hovered}>
        <LineStrikeRoomContext.Provider value={room}>
          <PhaseChecker spectator={spectator} index={tabIndex} />
          <ChatDrawer />
          <ReplayChecker />
        </LineStrikeRoomContext.Provider>
      </HoveredContext.Provider>
    </TabAudioContext.Provider>
  );
}

LineStrikeRoom.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
  tabIndex: PropTypes.any,
  tabActive: PropTypes.bool,
};
