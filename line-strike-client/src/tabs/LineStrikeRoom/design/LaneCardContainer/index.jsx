import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneCardContainer({
  children,
  top,
  active,
  disabled,
  onClick,
}) {
  const className = cx(styles.holder, {
    [styles.top]: top,
    [styles.active]: active,
  });
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

LaneCardContainer.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.bool,
};
