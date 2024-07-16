import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import inputStyles from "../TextInput/styles.module.css";

function SelectOption({ value, children }) {
  return <option value={value}>{children}</option>;
}

function SelectGroup({ label, children }) {
  return <optgroup label={label}>{children}</optgroup>;
}

export function Select({
  children,
  name,
  required,
  disabled,
  value,
  onChange,
  flex,
}) {
  const className = cx(inputStyles.input, styles.select, {
    [inputStyles.flex]: flex,
  });
  return (
    <select
      className={className}
      name={name}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

Select.Option = SelectOption;

Select.Group = SelectGroup;

SelectGroup.propTypes = {
  children: PropTypes.node,
  label: PropTypes.any,
};

SelectOption.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
};

Select.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.any,
  flex: PropTypes.bool,
};
