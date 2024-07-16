import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function DeckBuildLayout({ children }) {
  return <div className={styles.page}>{children}</div>;
}

DeckBuildLayout.propTypes = {
  children: PropTypes.node,
};
