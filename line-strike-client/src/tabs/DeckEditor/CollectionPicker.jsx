import { useContext, useMemo, useState } from "react";

import { Box } from "../../design/Box";
import { TextInput } from "../../design/TextInput";
import { CollectionList } from "../../design/CollectionList";
import { Tabs } from "../../design/Tabs";

import { useCards } from "../../hooks/useCards";

import { Context } from "./context";

const ELEMENTS = [
  "all",
  "fire",
  "ice",
  "wind",
  "lightning",
  "light",
  "darkness",
];

export function CollectionPicker() {
  const { cards, removeCard, setCards, setNoChanges, format, cardElements } =
    useContext(Context);
  const db = useCards();
  const [element, setElement] = useState("all");
  const [name, setName] = useState("");
  function countCard(id) {
    return cards.filter((i) => i === id).length;
  }

  const visibleCards = useMemo(() => {
    let cards = db.collection.map((i) => db.cards[i]);
    if (element !== "all") {
      cards = cards.filter((i) => i.element === element);
    }
    if (name) {
      cards = cards.filter((i) =>
        String(i.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return cards;
  }, [element, name, db.collection, db.cards]);
  return (
    <Box flex stretch>
      <Box.Header>
        <h2>Card Collection</h2>
      </Box.Header>
      <Box.Body>
        <Tabs>
          {ELEMENTS.map((i) => (
            <Tabs.Tab
              key={i}
              active={i === element}
              onClick={() => setElement(i)}
            >
              <img src={`elements/${i}.webp`} />
            </Tabs.Tab>
          ))}
        </Tabs>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            name="name"
            placeholder="Name Contains..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <CollectionList>
          {visibleCards.map((card) => {
            const onAdd = () => {
              setCards((cards) => {
                const newCards = [...cards];
                newCards.push(card.id);
                setNoChanges(false);
                return newCards;
              });
            };
            const onRemove = () => {
              const index = cards.indexOf(card.id);
              removeCard(index);
            };
            return (
              <CollectionList.Item
                key={card.id}
                card={card}
                count={countCard(card.id)}
                deckElements={cardElements}
                size={cards.length}
                format={format}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            );
          })}
        </CollectionList>
      </Box.Body>
    </Box>
  );
}