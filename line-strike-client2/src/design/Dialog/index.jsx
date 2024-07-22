import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function DialogHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export function DialogBody({ children }) {
  return <div className={styles.body}>{children}</div>;
}

export function Dialog({ flex, stretch, children }) {
  const className = cx(styles.box, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
  });
  return <div className={className}>{children}</div>;
}

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;

DialogHeader.propTypes = {
  children: PropTypes.node,
};

DialogBody.propTypes = {
  children: PropTypes.node,
};

Dialog.propTypes = {
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  children: PropTypes.node,
};
