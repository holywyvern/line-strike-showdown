import PropTypes from "prop-types";

import { Row } from "../../design/Row";

import { usePlayerState } from "./context";

export function FaceDownHand({ player }) {
  const { sleeve, handSize } = usePlayerState(player);
  return (
    <Row>
      {new Array(handSize).fill(null).map((_, i) => (
        <img key={i} src={`sleeves/${sleeve}`} style={{ maxWidth: "32px" }} />
      ))}
    </Row>
  );
}

FaceDownHand.propTypes = {
  player: PropTypes.any,
};
