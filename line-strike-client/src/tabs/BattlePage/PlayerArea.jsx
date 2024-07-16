import PropTypes from "prop-types";

import { usePlayerBoard } from "./context";
import { Playmat } from "../../design/Playmat";

export function PlayerArea({ mirror, player }) {
  const { lanes } = usePlayerBoard(player, mirror);

  if (!player) return null;
  return (
    <Playmat
      mirror={mirror}
      name={player.playmat}
      opacity={player.playmatOpacity}
    >
      {player.name} {mirror ? "UP" : "DOWN"}
    </Playmat>
  );
}

PlayerArea.propTypes = {
  mirror: PropTypes.bool,
  player: PropTypes.any,
};
