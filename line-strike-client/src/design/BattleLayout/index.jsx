import PropTypes from "prop-types";

import styles from "./styles.module.css";
import { LineStrikeBackground } from "../LineStrikeBackground";

export function BattleLayout({ children }) {
  return (
    <div className={styles.page}>
      <LineStrikeBackground />
      <div className={styles.contents}>{children}</div>
    </div>
  );
}

BattleLayout.propTypes = {
  children: PropTypes.node,
};
