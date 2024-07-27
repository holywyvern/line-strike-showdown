import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./styles.module.css";

export function TextInput({
  name,
  onChange,
  value,
  defaultValue,
  disabled,
  placeholder,
  minLength,
  maxLength,
  required,
  flex,
  type = "text",
}) {
  const className = cx(styles.input, { [styles.flex]: flex });
  return (
    <input
      className={className}
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  placeholder: PropTypes.any,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  flex: PropTypes.bool,
  type: PropTypes.string,
};
