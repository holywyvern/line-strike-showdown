import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function RightMenu({ children }) {
  return <nav className={styles.menu}>{children}</nav>;
}

RightMenu.propTypes = {
  children: PropTypes.node,
};
