import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function FilterBox({ children }) {
  return <div className={styles.box}>{children}</div>
}

FilterBox.propTypes = {
  children: PropTypes.node,
};