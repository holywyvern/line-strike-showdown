import PropTypes from "prop-types";

import { useHoveredCard, usePlayerState } from "./context";
import { useCards } from "../../hooks/useCards";
import { MiniCard } from "../../design/MiniCard";
import { HandHolder } from "../../design/HandHolder";
import { useEffect, useState } from "react";

export function PlayerHand({ player }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setCard] = useHoveredCard();
  const [usedHand, setUsedHand] = useState([]);
  const { cards } = useCards();
  const { handIDs } = usePlayerState(player);
  useEffect(() => {
    const hand = player.turn?.usedHand;
    if (!hand) return;

    hand.onChange(() => setUsedHand([...hand]));
  }, [player.turn?.usedHand]);
  const hand = (handIDs || []).map((i) => cards[i]).filter(Boolean);
  let virtualIndex = 0;
  return (
    <HandHolder>
      {hand.map((card, index) => {
        if (usedHand.includes(index)) return null;

        virtualIndex++;
        return (
          <MiniCard
            key={index}
            card={card}
            index={virtualIndex}
            size={hand.length}
            onHover={() => setCard(card)}
          />
        );
      })}
    </HandHolder>
  );
}

PlayerHand.propTypes = {
  player: PropTypes.any,
};
