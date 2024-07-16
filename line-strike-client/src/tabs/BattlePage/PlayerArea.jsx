import PropTypes from "prop-types";

import { usePlayerBoard } from "./context";
import { Playmat } from "../../design/Playmat";
import { Column } from "../../design/Column";
import { LaneLife } from "./LaneLife";

export function PlayerArea({ mirror, player }) {
  const { lanes } = usePlayerBoard(player, mirror);

  if (!player) return null;

  return (
    <Column>
      {mirror && <LaneLife lanes={[...(lanes || [])].reverse()} />}
      <Playmat
        mirror={mirror}
        name={player.playmat}
        opacity={player.playmatOpacity}
      >
        {player.name} {mirror ? "UP" : "DOWN"}
      </Playmat>
      {!mirror && <LaneLife lanes={[...(lanes || [])]} />}
    </Column>
  );
}

PlayerArea.propTypes = {
  mirror: PropTypes.bool,
  player: PropTypes.any,
};
