import PropTypes from "prop-types";

import { useHoveredCard, usePlayerState } from "./context";
import { useCards } from "../../hooks/useCards";
import { MiniCard } from "../../design/MiniCard";
import { HandHolder } from "../../design/HandHolder";

export function PlayerHand({ player }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setCard] = useHoveredCard();
  const { cards } = useCards();
  const { handIDs } = usePlayerState(player);
  const hand = (handIDs || []).map((i) => cards[i]).filter(Boolean);
  return (
    <HandHolder>
      {hand.map((card, index) => (
        <MiniCard
          key={index}
          card={card}
          index={index}
          size={hand.length}
          onHover={() => setCard(card)}
        />
      ))}
    </HandHolder>
  );
}

PlayerHand.propTypes = {
  player: PropTypes.any,
};
