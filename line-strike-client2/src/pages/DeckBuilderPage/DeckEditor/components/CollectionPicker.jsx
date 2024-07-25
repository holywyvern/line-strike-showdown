import { useContext, useMemo, useState } from "react";
import useIsMobile from "useismobile";

import { Context } from "../context";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { Dialog } from "../../../../design/Dialog";
import { Tabs } from "../../../../design/Tabs";
import { TextInput } from "../../../../design/TextInput";
import { CollectionList } from "../design/CollectionList";
import { MobileHeight } from "../design/MobileHeight";

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
  const db = useDatabase();
  const [element, setElement] = useState("all");
  const [name, setName] = useState("");
  const isMobile = useIsMobile();
  function countCard(id) {
    return cards.filter((i) => i === id).length;
  }

  const visibleCards = useMemo(() => {
    let cards = db.collection.map((i) => db.cards[i]);
    if (element !== "all") {
      cards = cards.filter((i) => i.element === element);
    }
    if (name) {
      cards = cards.filter(
        (i) =>
          String(i.name)
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase()) ||
          String(i.title).toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return cards;
  }, [element, name, db.collection, db.cards]);
  return (
    <Dialog flex={!isMobile} stretch>
      <Dialog.Header>
        <h2>Card Collection</h2>
      </Dialog.Header>
      <Dialog.Body>
        {!isMobile && (
          <Tabs>
            {ELEMENTS.map((i) => (
              <Tabs.Tab
                key={i}
                active={i === element}
                onClick={() => setElement(i)}
              >
                <img src={`/elements/${i}.webp`} />
              </Tabs.Tab>
            ))}
          </Tabs>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            name="name"
            placeholder="Name Contains..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <MobileHeight height={350}>
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
                  skills={db.skills}
                />
              );
            })}
          </CollectionList>
        </MobileHeight>
      </Dialog.Body>
    </Dialog>
  );
}
