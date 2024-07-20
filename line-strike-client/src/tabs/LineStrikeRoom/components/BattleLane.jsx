import PropTypes from "prop-types";
import { LaneContainer } from "../design/LaneContainer";
import { useSchema } from "../context";
import { LaneCard } from "./LaneCard";

export function BattleLane({ index, lane, top, playing }) {
  const data = useSchema(lane);
  let { cards } = data;
  if (top) {
    cards = [...cards].reverse();
  }
  return (
    <LaneContainer top={top} index={index}>
      {cards.map((card, cardIndex) => (
        <LaneCard
          key={cardIndex}
          card={card}
          top={top}
          playing={playing}
          lane={index}
        />
      ))}
    </LaneContainer>
  );
}

BattleLane.propTypes = {
  index: PropTypes.number,
  lane: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
};
