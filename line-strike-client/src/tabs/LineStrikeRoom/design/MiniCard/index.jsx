import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function MiniCard({ card, index, size, displacement, played }) {
  const className = cx(styles.mini, styles[card.element], {
    [styles.played]: played,
  });
  return (
    <div
      className={className}
      style={{
        "--index": index,
        "--size": size,
        "--displacement": displacement,
      }}
    >
      <div
        className={styles.art}
        style={{
          "--top": card.miniTop,
          "--left": card.miniLeft,
          "--img": `url('cards/${card.artwork}')`,
        }}
      />
      <div className={styles.border} />
    </div>
  );
}

MiniCard.propTypes = {
  card: PropTypes.any,
  index: PropTypes.number,
  size: PropTypes.number,
  displacement: PropTypes.number,
  played: PropTypes.bool,
};
