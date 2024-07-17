import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Row({
  children,
  center,
  centerChildren,
  spaceItems,
  end,
  flex,
}) {
  const className = cx(styles.row, {
    [styles.center]: center,
    [styles.end]: end,
    [styles["space-items"]]: spaceItems,
    [styles["center-children"]]: centerChildren,
    [styles.flex]: flex,
  });
  return <div className={className}>{children}</div>;
}

Row.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  end: PropTypes.bool,
  spaceItems: PropTypes.bool,
  centerChildren: PropTypes.bool,
  flex: PropTypes.bool, 
};
