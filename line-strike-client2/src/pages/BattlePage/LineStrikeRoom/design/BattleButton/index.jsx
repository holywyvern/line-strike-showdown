import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function BattleButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      BATTLE
    </button>
  );
}

BattleButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
