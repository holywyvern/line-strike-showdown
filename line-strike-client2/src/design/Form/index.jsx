import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function FormGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}

export function Form({ onSubmit, children }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.Group = FormGroup;

FormGroup.propTypes = {
  children: PropTypes.node,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};
