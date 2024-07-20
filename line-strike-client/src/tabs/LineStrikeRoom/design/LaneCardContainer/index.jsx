import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneCardContainer({ children, top, active }) {
  const className = cx(styles.holder, {
    [styles.top]: top,
    [styles.active]: active,
  });
  return <div className={className}>{children}</div>;
}

LaneCardContainer.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
  active: PropTypes.bool,
};
