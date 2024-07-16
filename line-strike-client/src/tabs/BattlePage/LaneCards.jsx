import PropTypes from "prop-types";
import { usePlayerState, useRoomState } from "./context";
import { useCards } from "../../hooks/useCards";
import { PlayedCard } from "../../design/PlayedCard";

function PlayedCardState({ card, play, mirror }) {
  const status = usePlayerState(play);
  return <PlayedCard status={status} card={card} mirror={mirror} />;
}

PlayedCardState.propTypes = {
  card: PropTypes.any,
  play: PropTypes.any,
  mirror: PropTypes.bool,
};

function Lane({ lane, mirror }) {
  const db = useCards();
  let { cards } = usePlayerState(lane);
  if (mirror) {
    cards = [...(cards || [])].reverse();
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {cards.map((card, index) => (
        <PlayedCardState
          key={index}
          card={db.cards[card.cardID]}
          play={card}
          mirror={mirror}
        />
      ))}
    </div>
  );
}

Lane.propTypes = {
  lane: PropTypes.any,
  mirror: PropTypes.bool,
};

export function LaneCards({ lanes, mirror }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const format = formats[formatID];
  if (!format) return null;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {lanes.map((lane, index) => (
        <Lane lane={lane} mirror={mirror} key={index} />
      ))}
    </div>
  );
}

LaneCards.propTypes = {
  lanes: PropTypes.any,
  mirror: PropTypes.bool,
};
