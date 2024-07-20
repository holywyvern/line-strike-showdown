import { useCards } from "../../../hooks/useCards";

import { useArraySchema, usePlayers } from "../context";

import { HandContainer } from "../design/HandContainer";
import { MiniCard } from "../design/MiniCard";

export function PlayerHand() {
  const { cards } = useCards();
  const { bottom } = usePlayers();
  const handIDs = useArraySchema(bottom?.handIDs);
  const hand = handIDs.map((i) => cards[i]);
  return (
    <HandContainer>
      {hand.map((card, index) => {
        return (
          <MiniCard
            key={index}
            card={card}
            index={index}
            size={hand.length}
            displacement={1}
          />
        );
      })}
    </HandContainer>
  );
}
