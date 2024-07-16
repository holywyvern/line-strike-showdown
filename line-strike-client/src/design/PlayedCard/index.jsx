import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { MiniCard } from "../MiniCard";
import { useHoveredCard } from "../../tabs/BattlePage/context";

function processCard(status, card) {
  return card;
}

export function PlayedCard({ status, card, mirror }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const className = cx(styles.card, { [styles.mirror]: mirror });
  const processedCard = processCard(status, card);
  return (
    <div className={className}>
      {processedCard && <MiniCard card={processedCard} onHover={() => setHoveredCard(card)} />}
    </div>
  );
}

PlayedCard.propTypes = {
  status: PropTypes.any,
  card: PropTypes.any,
  mirror: PropTypes.bool,
};
