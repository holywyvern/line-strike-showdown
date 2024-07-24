import { useContext } from "react";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { Context } from "../context";

import { Dialog } from "../../../../design/Dialog";
import { Button } from "../../../../design/Button";
import { Row } from "../../../../design/Button";
import { CardListing } from "../design/CardListing";

import { DeckCard } from "./DeckCard";


export function DeckBox() {
  const db = useDatabase();
  const { cards, setCards, setNoChanges, removeCard, onReset, noChanges } =
    useContext(Context);

  const onSort = () => {
    setCards((cards) => {
      const newCards = [...cards];
      newCards.sort(
        (a, b) => db.collection.indexOf(a) - db.collection.indexOf(b)
      );
      return newCards;
    });
    setNoChanges(false);
  };
  return (
    <Dialog flex>
      <Dialog.Header>
        <h2>Deck Listing</h2>
      </Dialog.Header>
      <Dialog.Body>
        <CardListing>
          {cards.map((i, index) => (
            <DeckCard key={index} id={i} onRemove={() => removeCard(index)} />
          ))}
        </CardListing>
        <br />
        <Row center>
          <Button onClick={onSort}>Sort Cards</Button>
          <Button disabled={noChanges} onClick={onReset}>
            Reset Deck
          </Button>
          <Button
            onClick={() => {
              setCards([]);
              setNoChanges(false);
            }}
          >
            Remove All Cards
          </Button>
        </Row>
      </Dialog.Body>
    </Dialog>
  );
}
