import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function DeckHolder({ top, count, sleeve = "blue_basic.webp" }) {
  const className = cx(styles.deck, { [styles.top]: top });
  return (
    <div className={className}>
      <div className={styles.wrapper}>
        {new Array(count).fill(null).map((_, index) => (
          <img
            key={index}
            src={`/sleeves/${sleeve}`}
            style={{ "--index": index }}
          />
        ))}
        {count > 0 && (
          <div className={styles.count}>
            <div className={styles.value}>{count}</div>
          </div>
        )}
      </div>
    </div>
  );
}

DeckHolder.propTypes = {
  top: PropTypes.bool,
  count: PropTypes.number,
  sleeve: PropTypes.string,
};
