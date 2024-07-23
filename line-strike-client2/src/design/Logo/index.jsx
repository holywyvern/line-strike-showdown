import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function Logo({ small }) {
  return (
    <div className={cx(styles.logo, { [styles.small]: small })}>
      <img src="/logo.png" alt="Line Strike Logo" />
      <div className={styles.text}>
        <h1>LINE STRIKE</h1>
        <h2>
          SHOWDOWN! <small>ALPHA</small>
        </h2>
      </div>
    </div>
  );
}

Logo.propTypes = {
  small: PropTypes.bool,
};
