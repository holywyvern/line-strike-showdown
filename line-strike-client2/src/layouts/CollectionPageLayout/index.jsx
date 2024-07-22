import PropTypes from "prop-types";
import { MainNavigation } from "../../design/MainNavigation";

import styles from "./styles.module.scss";

export function CollectionPageLayout({ children }) {
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

CollectionPageLayout.propTypes = {
  children: PropTypes.node,
};
