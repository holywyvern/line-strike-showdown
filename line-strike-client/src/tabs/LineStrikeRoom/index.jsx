import PropTypes from "prop-types";

import { LineStrikeRoomContext } from "./context";

import { PhaseChecker } from "./components/PhaseChecker";

export function LineStrikeRoom({ room, spectator }) {
  return (
    <LineStrikeRoomContext.Provider value={room}>
      <PhaseChecker spectator={spectator} />
    </LineStrikeRoomContext.Provider>
  );
}

LineStrikeRoom.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
};
