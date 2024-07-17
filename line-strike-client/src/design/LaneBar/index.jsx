import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneBar({ hp, maxHp, count, blue }) {
  const className = cx(styles.bar, {
    [styles.dead]: hp < 1,
    [styles.blue]: blue,
  });
  return (
    <ul className={className} style={{ "--max": maxHp * count }}>
      {new Array(maxHp).fill(null).map((_, index) => {
        return (
          <li
            key={index}
            className={cx(styles.hp, { [styles.fill]: hp > index })}
          />
        );
      })}
    </ul>
  );
}

LaneBar.propTypes = {
  hp: PropTypes.number,
  maxHp: PropTypes.number,
  count: PropTypes.number,
  blue: PropTypes.bool,
};
