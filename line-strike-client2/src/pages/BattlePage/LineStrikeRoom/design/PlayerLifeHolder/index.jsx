import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function PlayerLifeHolder({ children, top }) {
  const className = cx(styles.holder, { [styles.top]: top });
  return <div className={className}>{children}</div>;
}

PlayerLifeHolder.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
};
