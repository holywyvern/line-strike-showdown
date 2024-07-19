import PropTypes from "prop-types";

import { usePlayerState, useRoomState } from "./context";

import { useCards } from "../../hooks/useCards";
import { Row } from "../../design/Row";
import { Column } from "../../design/Column";

function Name({ player, main }) {
  const color = main ? "var(--player1-color)" : "var(--player2-color)";
  return (
    <h3
      style={{
        margin: 0,
        padding: 0,
        alignSelf: "flex-end",
        color,
      }}
    >
      {player?.name}
    </h3>
  );
}

Name.propTypes = {
  player: PropTypes.any,
  main: PropTypes.bool,
};

export function PlayerDeck({ player, main }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const { deckSize, sleeve } = usePlayerState(player);
  const format = formats[formatID];
  if (!format) return;

  return (
    <Column centerChildren>
      {main && <Name player={player} />}
      <Row centerChildren>
        <div
          style={{
            width: "64px",
            height: `${60 + 3 * (format.maxCards - 1)}px`,
            position: "relative",
            alignSelf: "flex-end"
          }}
        >
          {new Array(deckSize).fill(null).map((_, index) => {
            const j = (isNaN(deckSize) ? 0 : deckSize) - index;
            return (
              <img
                key={index}
                src={`sleeves/${sleeve || "blue_basic.webp"}`}
                style={{
                  maxWidth: "64px",
                  position: "absolute",
                  top: `${Math.floor((index * 2) / 4)}px`,
                  zIndex: j,
                }}
              />
            );
          })}
        </div>
      </Row>
      {!main && <Name player={player} main />}
    </Column>
  );
}

PlayerDeck.propTypes = {
  player: PropTypes.any,
  main: PropTypes.bool,
};
