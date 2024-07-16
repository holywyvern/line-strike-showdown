import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function HomepageLayout({ children }) {
  return <div className={styles.page}>{children}</div>;
}

HomepageLayout.propTypes = {
  children: PropTypes.node,
};
