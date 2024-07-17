import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Tab({ children, onClick, onClose, active }) {
  const className = cx(styles.tab, { [styles.active]: active });
  return (
    <li className={className}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
      {onClose && (
        <button type="button" onClick={onClose}>
          &times;
        </button>
      )}
    </li>
  );
}

Tab.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  active: PropTypes.bool,
};

export function Tabs({ children, main }) {
  const className = cx(styles.container, { [styles.main]: main });
  return (
    <nav className={className}>
      <ul>{children}</ul>
    </nav>
  );
}

Tabs.propTypes = {
  children: PropTypes.node,
  main: PropTypes.bool,
};

Tabs.Tab = Tab;
