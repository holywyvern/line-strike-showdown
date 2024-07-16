import PropTypes from "prop-types";

export function PlayerArea({ mirror, player }) {
  if (!player) return null;

  return (
    <div>
      {player.name} {mirror ? "UP" : "DOWN"}
    </div>
  );
}

PlayerArea.propTypes = {
  mirror: PropTypes.bool,
  player: PropTypes.any,
};
