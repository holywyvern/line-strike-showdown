import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function RangeInput({
  name,
  min,
  max,
  value,
  onChange,
  disabled,
  showValue,
}) {
  return (
    <div className={styles.wrapper}>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
      {showValue && <div className={styles.value}>{value}</div>}
    </div>
  );
}

RangeInput.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  showValue: PropTypes.bool,
};
