import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function MainPageLayout({ children }) {
  return <div className={styles.page}>{children}</div>;
}

MainPageLayout.propTypes = {
  children: PropTypes.node,
};
