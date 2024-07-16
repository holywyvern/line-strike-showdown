import PropTypes from "prop-types";
import { Row } from "../../design/Row";
import { useEffect, useState } from "react";

export function FaceDownHand({ player }) {
  const [{ sleeve, handSize }, setState] = useState({ ...(player || {}) });
  useEffect(() => {
    if (!player) return;

    player.onChange(() => setState({ ...player }));
  }, [player]);
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
