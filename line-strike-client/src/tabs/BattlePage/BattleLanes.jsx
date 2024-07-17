import PropTypes from "prop-types";

import { LaneHolder } from "../../design/LaneHolder";

import { PlayerArea } from "./PlayerArea";
import { LaneAttack } from "./LaneAttack";

export function BattleLanes({ playerA, playerB, useTurn }) {
  return (
    <LaneHolder>
      <PlayerArea mirror player={playerA} />
      <LaneAttack playerA={playerA} playerB={playerB} useTurn={useTurn} />
      <PlayerArea player={playerB} useTurn={useTurn} />
    </LaneHolder>
  );
}

BattleLanes.propTypes = {
  playerA: PropTypes.any,
  playerB: PropTypes.any,
  useTurn: PropTypes.bool,
};
