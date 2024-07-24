import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function Badge({ children }) {
  return <small className={styles.badge}>{children}</small>;
}

Badge.propTypes = {
  children: PropTypes.node,
};
