import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function LayoutContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export function Layout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

Layout.Content = LayoutContent;

LayoutContent.propTypes = {
  children: PropTypes.node,
};

Layout.propTypes = {
  children: PropTypes.node,
};
