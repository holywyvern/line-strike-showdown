import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function DialogHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export function DialogBody({ children, center }) {
  const className = cx(styles.body, { [styles.center]: center });
  return <div className={className}>{children}</div>;
}

export function Dialog({ flex, stretch, children, grow }) {
  const className = cx(styles.box, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
    [styles.grow]: grow,
  });
  return <div className={className}>{children}</div>;
}

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;

DialogHeader.propTypes = {
  children: PropTypes.node,
};

DialogBody.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node,
};

Dialog.propTypes = {
  grow: PropTypes.bool,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  children: PropTypes.node,
};
