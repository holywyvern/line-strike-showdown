import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Paragraph({ children }) {
  return <p className={styles.p}>{children}</p>;
}

Paragraph.propTypes = {
  children: PropTypes.node,
};
