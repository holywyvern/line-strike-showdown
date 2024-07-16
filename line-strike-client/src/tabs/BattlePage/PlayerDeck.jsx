import PropTypes from "prop-types";

import { usePlayerState, useRoomState } from "./context";

import { useCards } from "../../hooks/useCards";
import { Row } from "../../design/Row";

export function PlayerDeck({ player }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const { deckSize, sleeve } = usePlayerState(player);
  const format = formats[formatID];
  if (!format) return;

  return (
    <Row centerChildren>
      <div
        style={{
          width: "48px",
          height: `${44 + 3 * (format.maxCards - 1)}px`,
          position: "relative",
        }}
      >
        {new Array(deckSize).fill(null).map((_, index) => {
          const j = (isNaN(deckSize) ? 0 : deckSize) - index;
          return (
            <img
              key={index}
              src={`sleeves/${sleeve || "blue_basic.webp"}`}
              style={{
                maxWidth: "48px",
                position: "absolute",
                top: `${Math.floor(index * 2 / 4)}px`,
                zIndex: j,
              }}
            />
          );
        })}
      </div>
    </Row>
  );
}

PlayerDeck.propTypes = {
  player: PropTypes.any,
};
