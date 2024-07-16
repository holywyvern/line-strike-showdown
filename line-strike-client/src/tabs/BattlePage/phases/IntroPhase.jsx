import { useState } from "react";
import { Button } from "../../../design/Button";
import { Column } from "../../../design/Column";
import { Modal } from "../../../design/Modal";

import { useProfile } from "../../../hooks/useProfile";

import { useRoom } from "../context";

export function IntroPhase() {
  const profile = useProfile();
  const room = useRoom();
  const [selected, setSelected] = useState(-1);
  const decks = profile.allDecks[String(room.state.formatID)];
  return (
    <Modal open title="Select a Deck">
      <Column>
        {decks.map((deck, index) => (
          <Button
            key={index}
            disabled={selected >= 0}
            onClick={() => {
              room.send("deck", deck);
              setSelected(index);
            }}
          >
            {deck.name}
          </Button>
        ))}
      </Column>
    </Modal>
  );
}
