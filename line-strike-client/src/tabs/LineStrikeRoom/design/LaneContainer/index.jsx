import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneContainer({ children, index, top }) {
  const className = cx(styles.container, { [styles.top]: top });
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
};
