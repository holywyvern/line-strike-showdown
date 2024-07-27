import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function Column({ children, flex, center }) {
  const className = cx(styles.col, { [styles.flex]: flex, [styles.center]: center });
  return <div className={className}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
  center: PropTypes.bool
};
