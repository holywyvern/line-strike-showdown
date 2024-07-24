import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Column({
  children,
  flex,
  stretch,
  spaceItems,
  centerChildren,
}) {
  const className = cx(styles.column, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
    [styles["space-items"]]: spaceItems,
    [styles["center-children"]]: centerChildren,
  });
  return <div className={className}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  spaceItems: PropTypes.bool,
  centerChildren: PropTypes.bool,
};
