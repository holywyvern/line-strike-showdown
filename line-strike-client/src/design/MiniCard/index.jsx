import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { useState } from "react";

export function MiniCard({ card, onHover, buffed, debuffed, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const className = cx(styles.card, styles[card.element], {
    [styles.hovered]: hovered,
  });

  return (
    <div
      className={className}
      style={{ "--index": index }}
      onMouseEnter={() => {
        setHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className={styles.img}
        style={{ "--img": `url('cards/${card.artwork}')` }}
      />
      <div className={styles.border} />
      <div className={styles.pp}>{card.ppCost}</div>
      <div
        className={cx(styles.attack, {
          [styles.buffed]: buffed,
          [styles.debuffed]: debuffed,
        })}
      >
        {card.attack}
      </div>
    </div>
  );
}

MiniCard.propTypes = {
  buffed: PropTypes.bool,
  debuffed: PropTypes.bool,
  onHover: PropTypes.func,
  card: PropTypes.any,
  index: PropTypes.number,
};
