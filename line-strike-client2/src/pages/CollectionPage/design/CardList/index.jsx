import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function CardList({ children }) {
  return <div className={styles.list}>{children}</div>;
}

CardList.propTypes = {
  children: PropTypes.node,
};
