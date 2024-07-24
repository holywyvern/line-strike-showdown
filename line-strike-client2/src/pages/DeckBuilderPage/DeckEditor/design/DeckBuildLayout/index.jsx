import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function DeckBuildLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>{children}</div>
    </div>
  );
}

DeckBuildLayout.propTypes = {
  children: PropTypes.node,
};
