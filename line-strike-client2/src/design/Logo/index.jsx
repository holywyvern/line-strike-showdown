import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function Logo({ small, to = "/" }) {
  return (
    <Link to={to} className={cx(styles.logo, { [styles.small]: small })}>
      <img src="/logo.png" alt="Line Strike Logo" />
      <div className={styles.text}>
        <h1>LINE STRIKE</h1>
        <h2>
          SHOWDOWN! <small>ALPHA</small>
        </h2>
      </div>
    </Link>
  );
}

Logo.propTypes = {
  small: PropTypes.bool,
  to: PropTypes.string,
};
