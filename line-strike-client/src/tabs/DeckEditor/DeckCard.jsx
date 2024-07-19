import { useState } from "react";
import PropTypes from "prop-types";

import { useCards } from "../../hooks/useCards";

import { Modal } from "../../design/Modal";
import { Card } from "../../design/Card";
import { CardCollectionActions } from "../../design/CardCollectionActions";

export function DeckCard({ id, onRemove }) {
  const db = useCards();
  const [details, setDetails] = useState(false);

  const card = db.cards[id];
  if (!card) return null;

  return (
    <>
      <div style={{ position: "relative", inset: 0 }}>
        <img src={`cards/${card.artwork}`} style={{ width: "100%" }} />
        <CardCollectionActions
          onDetails={() => setDetails(true)}
          onRemove={onRemove}
        />
      </div>
      <Modal
        open={details}
        title="Card Details"
        onClose={() => setDetails(false)}
      >
        <Card card={card} />
      </Modal>
    </>
  );
}

DeckCard.propTypes = {
  id: PropTypes.any,
  onDetails: PropTypes.func,
  onRemove: PropTypes.func,
};
