import { useCards } from "../../../hooks/useCards";

import { useArraySchema, useBoard, usePlayers } from "../context";

import { HandContainer } from "../design/HandContainer";
import { MiniCard } from "../design/MiniCard";

export function PlayerHand() {
  const { cards } = useCards();
  const { bottom } = usePlayers();
  const handIDs = useArraySchema(bottom.handIDs);
  const { usedHand } = useBoard(bottom, false, true);
  const handIndexes = useArraySchema(usedHand);
  const hand = handIDs.map((i) => cards[i]).filter(Boolean);
  return (
    <HandContainer>
      {hand
        .filter((_, index) => !handIndexes.includes(index))
        .map((card, index) => {
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
