import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function CardListing({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

CardListing.propTypes = {
  children: PropTypes.node,
};
