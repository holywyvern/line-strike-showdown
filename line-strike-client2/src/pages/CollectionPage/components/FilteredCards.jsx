import { useFilteredCollection } from "../context";
import { Card } from "../design/Card";

import { CardList } from "../design/CardList";

export function FilteredCards() {
  const { cards } = useFilteredCollection();
  return (
    <CardList>
      {cards.map((i) => (
        <Card key={i.id} card={i} />
      ))}
    </CardList>
  );
}
