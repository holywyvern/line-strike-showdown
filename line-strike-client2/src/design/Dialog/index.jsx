import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function DialogHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export function DialogBody({ children, center, noOverflow }) {
  const className = cx(styles.body, {
    [styles.center]: center,
    [styles["no-overflow"]]: noOverflow,
  });
  return <div className={className}>{children}</div>;
}

export function Dialog({ flex, stretch, children, grow, style }) {
  const className = cx(styles.box, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
    [styles.grow]: grow,
  });
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;

DialogHeader.propTypes = {
  children: PropTypes.node,
};

DialogBody.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node,
  noOverflow: PropTypes.bool,
};

Dialog.propTypes = {
  grow: PropTypes.bool,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.any,
};
