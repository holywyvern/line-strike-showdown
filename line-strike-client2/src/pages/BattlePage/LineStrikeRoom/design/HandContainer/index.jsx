import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function HandContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

HandContainer.propTypes = {
  children: PropTypes.node,
};
