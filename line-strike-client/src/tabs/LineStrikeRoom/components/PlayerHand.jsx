import { useCards } from "../../../hooks/useCards";

import { useArraySchema, useBoard, usePlayers } from "../context";

import { HandContainer } from "../design/HandContainer";
import { MiniCard } from "../design/MiniCard";

export function PlayerHand() {
  const { cards } = useCards();
  const { bottom } = usePlayers();
  const handIDs = useArraySchema(bottom?.handIDs);
  const { usedHand } = useBoard(bottom, false, true);
  const handIndexes = useArraySchema(usedHand);
  const hand = handIDs.map((i) => cards[i]).filter(Boolean);
  return (
    <HandContainer>
      {hand.map((card, index) => {
        if (handIndexes.includes(index)) return null;

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
