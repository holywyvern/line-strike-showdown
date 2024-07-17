import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function PpDiamond({ pp, format }) {
  const className = cx(styles.wrapper, { [styles.max]: pp >= format.maxPP });
  return (
    <div className={className}>
      <div className={styles.diamond} />
      <div className={styles.amount}>{pp}</div>
    </div>
  );
}

PpDiamond.propTypes = {
  pp: PropTypes.number,
  format: PropTypes.any,
};
