import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Animation({ name }) {
  if (!name) return;

  const className = cx(styles.animation, styles[name]);
  return (
    <div className={styles.wrapper}>
      <div key={name} className={className} />
    </div>
  );
}

Animation.propTypes = {
  name: PropTypes.any,
};
