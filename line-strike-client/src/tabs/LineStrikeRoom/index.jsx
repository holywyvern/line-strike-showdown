import PropTypes from "prop-types";

import { LineStrikeRoomContext } from "./context";

import { PhaseChecker } from "./components/PhaseChecker";
import { HoveredContext } from "./context/HoveredCardContext";
import { useState } from "react";

export function LineStrikeRoom({ room, spectator }) {
  const hovered = useState(null);
  return (
    <HoveredContext.Provider value={hovered}>
      <LineStrikeRoomContext.Provider value={room}>
        <PhaseChecker spectator={spectator} />
      </LineStrikeRoomContext.Provider>
    </HoveredContext.Provider>
  );
}

LineStrikeRoom.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
};
