import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function LineStrikeGuide({ children }) {
  return <div className={styles.guide}>{children}</div>;
}

LineStrikeGuide.propTypes = {
  children: PropTypes.node,
};
