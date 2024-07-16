import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function TabView({ children, hidden }) {
  const className = cx(styles.view, { [styles.hidden]: hidden });
  return <div className={className}>{children}</div>;
}

TabView.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
};
