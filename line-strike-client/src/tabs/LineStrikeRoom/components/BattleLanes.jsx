import PropTypes from "prop-types";
import { BattleLane } from "./BattleLane";

export function BattleLanes({ lanes, top, playing }) {
  return (
    <>
      {lanes.map((lane, index) => (
        <BattleLane
          key={index}
          index={index}
          lane={lane}
          top={top}
          playing={playing}
        />
      ))}
    </>
  );
}

BattleLanes.propTypes = {
  lanes: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
};
