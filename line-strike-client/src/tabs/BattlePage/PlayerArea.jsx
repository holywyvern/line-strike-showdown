import PropTypes from "prop-types";

import { usePlayerBoard } from "./context";
import { Playmat } from "../../design/Playmat";
import { Column } from "../../design/Column";
import { LaneLife } from "./LaneLife";
import { LaneCards } from "./LaneCards";
import { UndoButton } from "./UndoButton";

export function PlayerArea({ mirror, player, useTurn }) {
  const { lanes } = usePlayerBoard(player, mirror, useTurn);

  if (!player) return null;

  return (
    <Column>
      {mirror && <LaneLife lanes={lanes} />}
      <Playmat
        mirror={mirror}
        name={player.playmat}
        opacity={player.playmatOpacity}
      >
        <LaneCards
          lanes={lanes}
          mirror={mirror}
          allowClick={useTurn}
          player={useTurn && player}
        />
        {useTurn && <UndoButton turn={player.turn} />}
      </Playmat>
      {!mirror && <LaneLife lanes={lanes} />}
    </Column>
  );
}

PlayerArea.propTypes = {
  mirror: PropTypes.bool,
  player: PropTypes.any,
  useTurn: PropTypes.bool,
};
