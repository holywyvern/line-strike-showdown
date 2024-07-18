import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function CircularProgress({ rate }) {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 250 250"
      className={styles.progress}
      style={{ "--progress": rate * 100 }}
    >
      <circle className={styles.bg}></circle>
      <circle className={styles.fg}></circle>
    </svg>
  );
}

CircularProgress.propTypes = {
  rate: PropTypes.number,
};
