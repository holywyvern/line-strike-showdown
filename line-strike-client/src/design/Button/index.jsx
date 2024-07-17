import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Button({
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  disabled,
  type = "button",
  children,
  link,
  monospace,
  flex,
}) {
  const className = cx(styles.button, {
    [styles.link]: link,
    [styles.monospace]: monospace,
    [styles.flex]: flex,
  });
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

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  link: PropTypes.bool,
  monospace: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  flex: PropTypes.bool,
};
