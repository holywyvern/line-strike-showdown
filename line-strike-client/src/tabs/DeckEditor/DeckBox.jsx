import { useContext } from "react";

import { Box } from "../../design/Box";
import { Button } from "../../design/Button";
import { Row } from "../../design/Row";
import { CardListing } from "../../design/CardListing";

import { useCards } from "../../hooks/useCards";

import { Context } from "./context";

import { DeckCard } from "./DeckCard";

export function DeckBox() {
  const db = useCards();
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
    <Box flex>
      <Box.Header>
        <h2>Deck Listing</h2>
      </Box.Header>
      <Box.Body>
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
      </Box.Body>
    </Box>
  );
}
