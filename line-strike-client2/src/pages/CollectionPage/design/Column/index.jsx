import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Column({ children }) {
  return <div className={styles.col}>{children}</div>
}

Column.propTypes = {
  children: PropTypes.node,
};