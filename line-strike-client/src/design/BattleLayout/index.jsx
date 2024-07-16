import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function BattleLayout({ children }) {
  return <div className={styles.page}>{children}</div>;
}

BattleLayout.propTypes = {
  children: PropTypes.node,
};
