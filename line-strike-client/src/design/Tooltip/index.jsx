import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Tooltip({ visible, children, contents }) {
  const className = cx(styles.tooltip, { [styles.visible]: visible });
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={className}>{contents}</div>
    </div>
  );
}

Tooltip.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  contents: PropTypes.node,
};
