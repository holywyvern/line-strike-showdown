
import { useDatabase } from "../../../../contexts/DatabaseContext";
import { MiniCard } from "../../../../design/MiniCard";

import { useArraySchema, useBoard, usePlayers } from "../context";
import { useHoveredCard } from "../context/HoveredCardContext";

import { HandContainer } from "../design/HandContainer";

export function PlayerHand() {
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();

  const { cards } = useDatabase();
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
              onHover={() => setHoveredCard(card)}
            />
          );
        })}
    </HandContainer>
  );
}
