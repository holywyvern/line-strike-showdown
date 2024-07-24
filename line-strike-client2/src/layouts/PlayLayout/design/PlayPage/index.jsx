import PropTypes from "prop-types";

import { PlayNav } from "../PlayNav";

import styles from "./styles.module.scss";

export function PlayPage({ children }) {
  return (
    <div className={styles.page}>
      <PlayNav />
      <div className={styles['play-content']}>{children}</div>
    </div>
  );
}

PlayPage.propTypes = {
  children: PropTypes.node,
};
