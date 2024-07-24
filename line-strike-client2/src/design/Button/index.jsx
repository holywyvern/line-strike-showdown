import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";
import { forwardRef } from "react";

function ButtonGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}

/* eslint-disable react/prop-types */
function ButtonComponent(
  {
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
  },
  ref
) {
  const className = cx(
    styles.button,
    {
      [styles.flex]: flex,
    },
    styles[size]
  );
  return (
    <button
      ref={ref}
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
/* eslint-enable react/prop-types */

export const Button = forwardRef(ButtonComponent);

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
