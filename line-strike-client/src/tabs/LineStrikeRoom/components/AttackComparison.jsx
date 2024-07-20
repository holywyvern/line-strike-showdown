import PropTypes from "prop-types";

import { LaneAttackContainer } from "../design/LaneAttackContainer";
import { LaneAttackValue } from "../design/LaneAttackValue";

export function AttackComparison({ top, bottom }) {
  const bothZero = top.attack === 0 && bottom.attack === 0;

  const topWinning = 
    bottom.hp < 1 || (!bothZero && top.attack >= bottom.attack);
  const bottomWinning =
    top.hp < 1 || (!bothZero && bottom.attack >= top.attack);
  return (
    <LaneAttackContainer>
      <LaneAttackValue value={top.attack} won={topWinning} lost={top.hp < 1} top />
      <LaneAttackValue
        value={bottom.attack}
        won={bottomWinning}
        lost={bottom.hp < 1}
      />
    </LaneAttackContainer>
  );
}

AttackComparison.propTypes = {
  top: PropTypes.any,
  bottom: PropTypes.any,
};
