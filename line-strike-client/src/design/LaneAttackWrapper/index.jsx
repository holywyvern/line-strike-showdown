import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function LaneAttackWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

LaneAttackWrapper.propTypes = {
  children: PropTypes.node,
};
