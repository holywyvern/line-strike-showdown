import PropTypes from "prop-types";

import { usePlayerState } from "./context";

export function FaceDownHand({ player }) {
  const { sleeve, handSize } = usePlayerState(player);
  return (
    <div
      style={{
        flex: 1,
        minWidth: "250px",
        maxWidth: "250px",
        minHeight: "96px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, display: "flex" }}>
        {new Array(handSize).fill(null).map((_, i) => (
          <img
            key={i}
            src={`sleeves/${sleeve || "blue_basic.webp"}`}
            style={{
              maxWidth: "48px",
              position: "relative",
              left: `-${i * (24 + Math.floor(22 * (handSize / 15))) }px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

FaceDownHand.propTypes = {
  player: PropTypes.any,
};
