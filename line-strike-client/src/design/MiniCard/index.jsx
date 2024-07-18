import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { useState } from "react";

export function MiniCard({
  card,
  onHover,
  buffed,
  debuffed,
  index = 0,
  size = 0,
  fixed,
}) {
  const [hovered, setHovered] = useState(false);
  const className = cx(styles.card, styles[card.element], {
    [styles.hovered]: hovered,
    [styles.fixed]: fixed,
    [styles.inactive]: card.stunned || card.incapacitated,
  });

  return (
    <div
      className={className}
      style={{ "--index": index, "--size": size }}
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
      <div className={styles.icons}>
        {card.baseGuard && <img src="flags/base_guard.webp" />}
        {card.baseBuster && <img src="flags/base_buster.webp" />}
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
  size: PropTypes.number,
  fixed: PropTypes.bool,
};
