import PropTypes from "prop-types";

import { useCards } from "../../../hooks/useCards";

import { useSchema } from "../context";

import { LaneCardContainer } from "../design/LaneCardContainer";
import { MiniCard } from "../design/MiniCard";

export function LaneCard({ card, top }) {
  const { cards } = useCards();
  const {
    cardID,
    incapacitated,
    stunned,
    attack,
    baseBuster,
    baseGuard,
  } = useSchema(card);
  const data = cards[cardID] || {};
  const processedCard = {
    ...data,
    attack,
    baseBuster,
    baseGuard,
    incapacitated,
    stunned,
    normalAttack: attack,
  };
  return (
    <LaneCardContainer top={top}>
      <MiniCard card={processedCard} played />
    </LaneCardContainer>
  );
}

LaneCard.propTypes = {
  card: PropTypes.any,
  top: PropTypes.bool,
};
