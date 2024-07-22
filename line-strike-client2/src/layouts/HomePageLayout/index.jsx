import PropTypes from "prop-types";
import cx from "classnames";

import useIsMobile from "useismobile";

import styles from "./styles.module.scss";

import { Trailer } from "../../design/Trailer";
import { Dialog } from "../../design/Dialog";
import { MainNavigation } from "../../design/MainNavigation";

export function HomePageLayout({ children }) {
  const isMobile = useIsMobile();
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <Dialog>
        <Dialog.Header>
          <h3>Welcome to LINE STRIKE SHOWDOWN</h3>
        </Dialog.Header>
        <Dialog.Body>
          <div className={cx(styles.row, { [styles.mobile]: isMobile })}>
            <Trailer />
            <div className={styles.content}>{children}</div>
          </div>
        </Dialog.Body>
      </Dialog>
    </div>
  );
}

HomePageLayout.propTypes = {
  children: PropTypes.node,
};
