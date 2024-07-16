import PropTypes from "prop-types";

import { Row } from "../../design/Row";

import { usePlayerState } from "./context";

export function FaceDownHand({ player }) {
  const { sleeve, handSize } = usePlayerState(player);
  return (
    <Row>
      {new Array(handSize).fill(null).map((_, i) => (
        <img
          key={i}
          src={`sleeves/${sleeve || "blue_basic.webp"}`}
          style={{
            maxWidth: "48px",
            position: "relative",
            left: `-${i * 24}px`,
          }}
        />
      ))}
    </Row>
  );
}

FaceDownHand.propTypes = {
  player: PropTypes.any,
};
