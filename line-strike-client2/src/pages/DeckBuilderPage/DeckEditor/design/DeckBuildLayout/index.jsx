import PropTypes from "prop-types";
import cx from "classnames";

import useIsMobile from "useismobile";

import styles from "./styles.module.css";

export function DeckBuildLayout({ children }) {
  const isMobile = useIsMobile(1024);
  const className = cx(styles.wrapper, { [styles.mobile]: isMobile })
  return (
    <div className={className}>
      <div className={styles.page}>{children}</div>
    </div>
  );
}

DeckBuildLayout.propTypes = {
  children: PropTypes.node,
};
