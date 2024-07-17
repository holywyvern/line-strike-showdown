import PropTypes from "prop-types";

import { usePlayerState } from "./context";

import { LaneBar } from "../../design/LaneBar";
import { Row } from "../../design/Row";

function Life({ lane, count, blue }) {
  const { hp, maxHp } = usePlayerState(lane);
  return <LaneBar hp={hp} maxHp={maxHp} count={count} blue={blue} />;
}

Life.propTypes = {
  lane: PropTypes.any,
  count: PropTypes.number,
  blue: PropTypes.bool,
};

export function LaneLife({ lanes, blue }) {
  return (
    <div
      style={{
        "--correction": "calc(var(--h) - 64)",
        maxWidth: "calc(var(--correction) * 16 / 18 * 1px)",
      }}
    >
      <Row centerChildren flex>
        {lanes.map((lane, index) => (
          <Life key={index} lane={lane} count={lanes.length} blue={blue} />
        ))}
      </Row>
    </div>
  );
}

LaneLife.propTypes = {
  lanes: PropTypes.any,
  blue: PropTypes.bool,
};
