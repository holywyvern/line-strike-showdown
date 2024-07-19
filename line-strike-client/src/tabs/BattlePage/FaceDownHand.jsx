import PropTypes from "prop-types";

import { usePlayerState } from "./context";

export function FaceDownHand({ player }) {
  const { sleeve, handSize } = usePlayerState(player);
  return (
    <div
      style={{
        flex: 1,
        minWidth: "calc(var(--lane-scale, 1) * 250px)",
        maxWidth: "calc(var(--lane-scale, 1) * 250px)",
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
              maxWidth: "calc(var(--lane-scale, 1) * 48px)",
              position: "relative",
              left: `calc(var(--lane-scale, 1) * -${i * (24 + Math.floor(22 * (handSize / 15))) }px)`,
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
