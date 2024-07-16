import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Row({ children, center, spaceItems, end }) {
  const className = cx(styles.row, {
    [styles.center]: center,
    [styles.end]: end,
    [styles["space-items"]]: spaceItems,
  });
  return <div className={className}>{children}</div>;
}

Row.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  end: PropTypes.bool,
  spaceItems: PropTypes.bool,
};
