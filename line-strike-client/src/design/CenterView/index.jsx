import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function CenterView({ children }) {
  return <div className={styles.view}>{children}</div>;
}

CenterView.propTypes = {
  children: PropTypes.node,
};
