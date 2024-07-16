import PropTypes from "prop-types";

export function LaneAttack({ playerA, playerB }) {
  if (!playerA || !playerB) return null;

  return null;
}

LaneAttack.propTypes = {
  playerA: PropTypes.any,
  playerB: PropTypes.any,
};
