import PropTypes from "prop-types";

import { LaneHolder } from "../../design/LaneHolder";

import { PlayerArea } from "./PlayerArea";
import { LaneAttack } from "./LaneAttack";

export function BattleLanes({ playerA, playerB }) {
  return (
    <LaneHolder>
      <PlayerArea mirror player={playerA} />
      <LaneAttack playerA={playerA} playerB={playerB} />
      <PlayerArea player={playerB} />
    </LaneHolder>
  );
}

BattleLanes.propTypes = {
  playerA: PropTypes.any,
  playerB: PropTypes.any,
};
