import PropTypes from "prop-types";
import { LaneContainer } from "../design/LaneContainer";
import { useSchema } from "../context";
import { LaneCard } from "./LaneCard";

export function BattleLane({ index, lane, top }) {
  let { cards } = useSchema(lane);
  if (top) {
    cards = cards.reverse();
  }
  return (
    <LaneContainer top={top} index={index}>
      {cards.map((card, index) => (
        <LaneCard key={index} card={card} top={top} />
      ))}
    </LaneContainer>
  );
}

BattleLane.propTypes = {
  index: PropTypes.number,
  lane: PropTypes.any,
  top: PropTypes.bool,
};
