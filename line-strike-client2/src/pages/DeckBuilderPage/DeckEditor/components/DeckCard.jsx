import { useState } from "react";
import PropTypes from "prop-types";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { CardCollectionActions } from "../design/CardCollectionActions";

import { Modal } from "../../../../design/Modal";

import { Card } from "../../../CollectionPage/design/Card";


export function DeckCard({ id, onRemove }) {
  const db = useDatabase();
  const [details, setDetails] = useState(false);

  const card = db.cards[id];
  if (!card) return null;

  return (
    <>
      <div style={{ position: "relative", inset: 0 }}>
        <img src={`/cards/${card.artwork}`} style={{ width: "100%" }} />
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
