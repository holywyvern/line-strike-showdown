import useIsMobile from "useismobile";

import { useFilteredCollection } from "../context";

import { Card } from "../design/Card";
import { CardList } from "../design/CardList";

export function FilteredCards() {
  const isMobile = useIsMobile();
  const { cards } = useFilteredCollection();
  return (
    <CardList>
      {cards.map((i) => (
        <Card scale={isMobile ? 0.5 : 1} key={i.id} card={i} />
      ))}
    </CardList>
  );
}
