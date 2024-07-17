import PropTypes from "prop-types";

import { usePlayerBoard, usePlayerState } from "./context";

import { Row } from "../../design/Row";
import { LaneValue } from "../../design/LaneValue";
import { LaneAttackWrapper } from "../../design/LaneAttackWrapper";

function LaneValueState({ lane, other, main }) {
  const state = usePlayerState(lane);
  const rival = usePlayerState(other);
  return <LaneValue lane={state} other={rival} main={main} />;
}

LaneValueState.propTypes = {
  lane: PropTypes.any,
  other: PropTypes.any,
  main: PropTypes.bool,
};

function LaneAttackState({ playerA, playerB, useTurn }) {
  const { lanes: lanesA } = usePlayerBoard(playerA, true, false);
  const { lanes: lanesB } = usePlayerBoard(playerB, false, useTurn);
  return (
    <div style={{ position: "relative", minHeight: "16px" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "-20%",
          zIndex: 100,
          transform: "translateY(-25%)",
          "--correction": "calc(var(--h) - 64)",
          maxWidth: "calc(var(--correction)* 16 / 18* 1px)",
        }}
      >
        <Row flex stetchSelf centerChildren>
          {lanesB.map((b, index) => {
            const a = lanesA[index];
            return (
              <LaneAttackWrapper key={index}>
                <Row>
                  <LaneValueState lane={a} other={b} />
                  /
                  <LaneValueState lane={b} other={a} main />
                </Row>
              </LaneAttackWrapper>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export function LaneAttack(props) {
  if (!props.playerA || !props.playerB) return null;

  return <LaneAttackState {...props} />;
}

LaneAttack.propTypes = {
  playerA: PropTypes.any,
  playerB: PropTypes.any,
  useTurn: PropTypes.bool,
};

LaneAttackState.propTypes = LaneAttack.propTypes;
