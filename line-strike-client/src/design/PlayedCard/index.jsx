import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { MiniCard } from "../MiniCard";
import { useHoveredCard } from "../../tabs/BattlePage/context";

function processCard(status, card) {
  if (!card) return null;

  const { ppCost, artwork, element, id, skill } = card;

  return { ...status, ppCost, artwork, element, id, skill };
}

export function PlayedCard({ status, card, mirror, onClick }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const className = cx(styles.card, {
    [styles.mirror]: mirror,
    [styles.active]: onClick,
  });
  const processedCard = processCard(status, card);
  return (
    <button
      disabled={!onClick}
      type="button"
      className={className}
      onClick={onClick}
    >
      {processedCard && (
        <MiniCard
          fixed
          card={processedCard}
          onHover={() => card && setHoveredCard(card)}
        />
      )}
    </button>
  );
}

PlayedCard.propTypes = {
  status: PropTypes.any,
  card: PropTypes.any,
  mirror: PropTypes.bool,
  onClick: PropTypes.func,
};
