import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function InputRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}

InputRow.propTypes = {
  children: PropTypes.node,
};
