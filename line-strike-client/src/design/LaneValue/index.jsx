import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneValue({ lane, other, main }) {
  const className = cx(styles.lane, {
    [styles.dead]: lane.hp < 1,
    [styles.strong]:
      lane.attack > 0 && (other.hp < 1 || other.attack <= lane.attack),
    [styles.main]: main,
  });
  return <div className={className}>{lane.attack}</div>;
}

LaneValue.propTypes = {
  lane: PropTypes.any,
  other: PropTypes.any,
  main: PropTypes.bool,
};
