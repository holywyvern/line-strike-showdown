import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Checkbox({ children, checked, onChange }) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
