import PropTypes from "prop-types";

import styles from "./styles.module.css";

function ListItem({ children }) {
  return <li>{children}</li>;
}

export function List({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}

List.Item = ListItem;

ListItem.propTypes = {
  children: PropTypes.node,
};

List.propTypes = {
  children: PropTypes.node,
};
