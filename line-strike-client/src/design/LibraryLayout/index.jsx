import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function LibraryLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

LibraryLayout.propTypes = {
  children: PropTypes.node,
};
