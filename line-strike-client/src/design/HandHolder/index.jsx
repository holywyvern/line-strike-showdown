import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function HandHolder({ children }) {
  return <div className={styles.holder}><div className={styles.contents}>{children}</div></div>;
}

HandHolder.propTypes = {
  children: PropTypes.node,
};
