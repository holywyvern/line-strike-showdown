import PropTypes from "prop-types";


export function Checkbox({ children, checked, onChange }) {
  return (
    <label>
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