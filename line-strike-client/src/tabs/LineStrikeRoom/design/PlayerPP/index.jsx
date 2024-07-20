import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function PlayerPP({ value, top, max }) {
  const rate = value / max;
  const className = cx(styles.pp, {
    [styles.top]: top,
    [styles.max]: rate >= 1,
    [styles.high]: rate > 0.5,
    [styles.empty]: rate <= 0,
  });
  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.icon} />
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}

PlayerPP.propTypes = {
  value: PropTypes.number,
  top: PropTypes.bool,
  max: PropTypes.number,
};
