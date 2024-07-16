import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function Sidenav({ children }) {
  return <nav className={styles.nav}>{children}</nav>;
}

Sidenav.propTypes = {
  children: PropTypes.node,
};
