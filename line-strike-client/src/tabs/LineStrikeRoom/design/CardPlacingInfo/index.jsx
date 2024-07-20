import PropTypes from "prop-types";

import styles from "./styles.module.css";
import { MiniCard } from "../MiniCard";

export function CardPlacingInfo({ card, pp, canPlace }) {
  if (!card) return null;

  return (
    <div className={styles.info}>
      <div className={styles.mini}>
        <MiniCard played card={card} scale={0.5} />
      </div>
      <div className={styles.details}>
        <h4>{card.name}</h4>
        <h5>{card.skill.name}</h5>
      </div>
      <div className={styles.cost}>
        {canPlace ? <>PP: {pp}</> : <>&times;</>}
      </div>
    </div>
  );
}

CardPlacingInfo.propTypes = {
  card: PropTypes.any,
  pp: PropTypes.number,
  canPlace: PropTypes.bool,
};
