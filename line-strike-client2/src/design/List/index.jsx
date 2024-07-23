import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import { forwardRef } from "react";

function ListItem({ children }) {
  return <li>{children}</li>;
}

// eslint-disable-next-line react/prop-types
function ListElement({ children }, ref) {
  return (
    <ul ref={ref} className={styles.list}>
      {children}
    </ul>
  );
}

export const List = forwardRef(ListElement);

List.Item = ListItem;

ListItem.propTypes = {
  children: PropTypes.node,
};

List.propTypes = {
  children: PropTypes.node,
};
