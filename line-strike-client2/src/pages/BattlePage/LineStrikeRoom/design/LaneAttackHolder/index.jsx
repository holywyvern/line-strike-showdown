import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function LaneAttackHolder({ children }) {
  return <div className={styles.holder}>{children}</div>;
}

LaneAttackHolder.propTypes = {
  children: PropTypes.node,
};
