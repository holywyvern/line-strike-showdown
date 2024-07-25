import { useState } from "react";
import PropTypes from "prop-types";

import useIsMobile from "useismobile";

import { useProfile } from "../../../../contexts/ProfileContext";

import { useBattleRoom, useBattleRoomState } from "../context";

import { Modal } from "../../../../design/Modal";
import { Dialog } from "../../../../design/Dialog";
import { Row } from "../../../../design/Row";
import { Column } from "../../../../design/Column";
import { Button } from "../../../../design/Button";

import { CardListing } from "../design/CardListing";
import { DeckCard } from "../../../DeckBuilderPage/DeckEditor/components/DeckCard";

function MobileDecks({ children }) {
  const isPortait = useIsMobile(480);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${isPortait ? 2 : 5}, 1fr)`,
        gap: "var(--gap-md)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

MobileDecks.propTypes = {
  children: PropTypes.node,
};

export function DeckSelection() {
  const room = useBattleRoom();
  const profile = useProfile();
  const { formatID } = useBattleRoomState();
  const [selected, setSelected] = useState(false);
  const decks = profile.decks[formatID] || [];
  const [cards, setCards] = useState(decks[0]?.cards || []);
  const isMobile = useIsMobile(1024);

  const List = isMobile ? MobileDecks : Column;

  return (
    <Modal open fake>
      <Dialog>
        <Dialog.Header>
          <h3>SELECT DECK</h3>
        </Dialog.Header>
        <Dialog.Body>
          <Row centerChildren>
            <List flex>
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
            </List>
            {!isMobile && (
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
            )}
          </Row>
        </Dialog.Body>
      </Dialog>
    </Modal>
  );
}
