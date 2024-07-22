import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Label({ children, htmlFor }) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};
