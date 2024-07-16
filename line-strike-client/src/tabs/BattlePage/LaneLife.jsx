import PropTypes from "prop-types";

import { usePlayerState } from "./context";

import { LaneBar } from "../../design/LaneBar";
import { Row } from "../../design/Row";

function Life({ lane, count }) {
  const { hp, maxHp } = usePlayerState(lane);
  return <LaneBar hp={hp} maxHp={maxHp} count={count} />;
}

Life.propTypes = {
  lane: PropTypes.any,
  count: PropTypes.number,
};

export function LaneLife({ lanes }) {
  return (
    <div
      style={{
        "--correction": "calc(var(--h) - 64)",
        maxWidth: "calc(var(--correction) * 16 / 18 * 1px)",
      }}
    >
      <Row centerChildren flex>
        {lanes.map((lane, index) => (
          <Life key={index} lane={lane} count={lanes.length} />
        ))}
      </Row>
    </div>
  );
}

LaneLife.propTypes = {
  lanes: PropTypes.any,
};
