import PropTypes from "prop-types";
import cx from "classnames";

import inputStyles from "../TextInput/styles.module.css";

export function TextArea({
  name,
  value,
  onChange,
  flex,
  disabled,
  readOnly,
  required,
  placeholder,
}) {
  const className = cx(inputStyles.input, {
    [inputStyles.flex]: flex,
  });
  return (
    <textarea
      onChange={onChange}
      value={value}
      name={name}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder}
    />
  );
}

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  flex: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};
