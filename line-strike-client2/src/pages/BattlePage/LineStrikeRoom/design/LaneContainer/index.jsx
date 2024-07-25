import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneContainer({ children, index, top, animation }) {
  const className = cx(styles["lane-container"], {
    [styles.top]: top,
    [styles.animation]: animation,
  });
  return (
    <div className={className} style={{ "--index": index }}>
      {children}
    </div>
  );
}

LaneContainer.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  top: PropTypes.bool,
  animation: PropTypes.bool,
};
