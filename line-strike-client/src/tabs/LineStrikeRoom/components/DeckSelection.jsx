import { useState } from "react";

import { Button } from "../../../design/Button";
import { CardListing } from "../../../design/CardListing";
import { Column } from "../../../design/Column";
import { Modal } from "../../../design/Modal";
import { Row } from "../../../design/Row";

import { useProfile } from "../../../hooks/useProfile";
import { DeckCard } from "../../DeckEditor/DeckCard";

import { useBattleRoom, useBattleRoomState } from "../context";

export function DeckSelection() {
  const room = useBattleRoom();
  const profile = useProfile();
  const { formatID } = useBattleRoomState();
  const [selected, setSelected] = useState(false);
  const decks = profile.allDecks[formatID] || [];
  const [cards, setCards] = useState(decks[0]?.cards || []);

  return (
    <Modal open title="SELECT DECK" fake>
      <Row centerChildren>
        <Column>
          {decks.map((deck, index) => {
            const onDeckSelection = () => {
              setSelected(true);
              room.send("deck", deck);
            };
            const onDeckDisplay = () => setCards(deck.cards);
            return (
              <Button
                disabled={selected}
                key={index}
                onClick={onDeckSelection}
                onMouseEnter={onDeckDisplay}
              >
                {deck.name}
              </Button>
            );
          })}
        </Column>
        <div
          style={{
            paddingLeft: "50px",
            maxWidth: "400px",
            overflow: "hidden",
          }}
        >
          <CardListing>
            {cards.map((i, index) => (
              <DeckCard key={`card-${index}`} id={i} />
            ))}
          </CardListing>
        </div>
      </Row>
    </Modal>
  );
}
