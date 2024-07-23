import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";


export function Box({ children, flex, stretch }) {
  const className = cx(styles.box, {
    [styles.flex]: flex,
    [styles.stretch]: stretch,
  });
  return <div className={className}>{children}</div>;
}

Box.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  light: PropTypes.bool,
};
