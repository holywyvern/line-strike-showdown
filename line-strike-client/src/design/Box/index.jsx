import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function BoxHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export function BoxBody({ children }) {
  return <div className={styles.body}>{children}</div>;
}

export function Box({ children, flex, stretch, light }) {
  const className = cx(styles.box, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
    [styles.light]: light,
  });
  return <div className={className}>{children}</div>;
}

Box.Header = BoxHeader;
Box.Body = BoxBody;

BoxHeader.propTypes = {
  children: PropTypes.node,
};

BoxBody.propTypes = {
  children: PropTypes.node,
};

Box.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  light: PropTypes.bool,
};
