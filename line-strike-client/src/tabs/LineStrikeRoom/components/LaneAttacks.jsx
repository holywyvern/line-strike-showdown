import PropTypes from "prop-types";

import { useBoard } from "../context";
import { LaneAttackHolder } from "../design/LaneAttackHolder";

import { AttackComparison } from "./AttackComparison";

export function LaneAttacks({ top, bottom, playing }) {
  const { lanes: lanesA } = useBoard(top, true, false);
  const { lanes: lanesB } = useBoard(bottom, false, playing);
  return (
    <LaneAttackHolder>
      {lanesA.map((top, index) => {
        const bottom = lanesB[index];
        return <AttackComparison key={index} top={top} bottom={bottom} />;
      })}
    </LaneAttackHolder>
  );
}

LaneAttacks.propTypes = {
  top: PropTypes.any,
  bottom: PropTypes.any,
  playing: PropTypes.bool,
};
