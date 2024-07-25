import PropTypes from "prop-types";
import cx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

function Tab({ name, icon, active, onClose, onClick, notify }) {
  return (
    <div
      className={cx(styles.tab, {
        [styles.active]: active,
        [styles.blink]: notify,
      })}
    >
      <button
        className={styles.button}
        type="button"
        disabled={active}
        onClick={onClick}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={styles.name}>{name}</div>
      </button>
      {onClose ? (
        <button className={styles.close} type="button" onClick={onClose}>
          &times;
        </button>
      ) : null}
    </div>
  );
}

export function TabContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

TabContainer.Tab = Tab;

Tab.propTypes = {
  notify: PropTypes.any,
  name: PropTypes.string,
  icon: PropTypes.any,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

TabContainer.propTypes = {
  children: PropTypes.node,
};
