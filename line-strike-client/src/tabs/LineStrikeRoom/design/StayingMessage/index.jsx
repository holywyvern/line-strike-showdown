import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function StayingMessage({ visible, top }) {
  if (!visible) return null;

  const className = cx(styles.message, { [styles.top]: top });

  return <div className={className}>STAY</div>;
}

StayingMessage.propTypes = {
  visible: PropTypes.bool,
  top: PropTypes.bool,
};
