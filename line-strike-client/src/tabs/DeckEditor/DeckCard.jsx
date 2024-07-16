import PropTypes from "prop-types";

import { Card } from "../../design/Card";

import { useCards } from "../../hooks/useCards";

export function DeckCard({ id, onRemove }) {
  const db = useCards();
  return (
    <>
      <Card card={db.cards[id]} scale={0.25} hiddenInfo>
        <button
          style={{
            appearance: "none",
            fontSize: "42px",
            border: 0,
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
          onClick={onRemove}
        >
          <h4>Remove</h4>
        </button>
      </Card>
    </>
  );
}

DeckCard.propTypes = {
  id: PropTypes.any,
  onRemove: PropTypes.func,
};
