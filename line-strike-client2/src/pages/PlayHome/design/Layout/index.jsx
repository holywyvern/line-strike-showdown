import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Layout({ children }) {
  return <div className={styles['play-page']}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
