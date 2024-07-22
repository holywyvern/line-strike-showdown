import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

function ButtonGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}

export function Button({
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  disabled,
  type = "button",
  children,
  flex,
  size = "md",
}) {
  const className = cx(
    styles.button,
    {
      [styles.flex]: flex,
    },
    styles[size]
  );
  return (
    <button
      className={className}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.Group = ButtonGroup;

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  size: PropTypes.oneOf(["xs", "md", "xl"]),
  children: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  flex: PropTypes.bool,
};
