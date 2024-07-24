import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function LaneAttackContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

LaneAttackContainer.propTypes = {
  children: PropTypes.node,
};
