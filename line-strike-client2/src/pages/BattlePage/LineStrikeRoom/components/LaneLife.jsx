import PropTypes from "prop-types";
import { useSchema } from "../context";
import { LaneHpBar } from "../design/LaneHpBar";

export function LaneLife({ lane, top }) {
  const { hp, maxHp } = useSchema(lane);
  return (
    <LaneHpBar top={top} max={maxHp}>
      {new Array(maxHp).fill(null).map((_, index) => (
        <LaneHpBar.Part key={index} fill={index < hp} max={maxHp} />
      ))}
    </LaneHpBar>
  );
}

LaneLife.propTypes = {
  lane: PropTypes.any,
  top: PropTypes.bool,
};
