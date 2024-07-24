import PropTypes from "prop-types";

import styles from "./styles.module.css";

import { UndoIcon } from "../UndoIcon";

export function UndoButton({ onClick, disabled }) {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <UndoIcon />
      UNDO
    </button>
  );
}

UndoButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
