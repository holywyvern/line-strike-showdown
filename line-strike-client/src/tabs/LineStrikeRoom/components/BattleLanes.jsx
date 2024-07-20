import PropTypes from "prop-types";
import { BattleLane } from "./BattleLane";

export function BattleLanes({ lanes, top }) {
  return (
    <>
      {lanes.map((lane, index) => (
        <BattleLane key={index} index={index} lane={lane} top={top} />
      ))}
    </>
  );
}

BattleLanes.propTypes = {
  lanes: PropTypes.any,
  top: PropTypes.bool,
};
