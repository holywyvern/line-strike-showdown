import { useState } from "react";
import useIsMobile from "useismobile";
import Drawer from "react-modern-drawer";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

function MobileDrawer({ open, children, toggle }) {
  return (
    <Drawer
      direction="left"
      className={cx(styles.nav, styles.open)}
      open={open}
      onClose={toggle}
      lockBackgroundScroll
    >
      {children}
    </Drawer>
  );
}

export function Sidenav({ children }) {
  const isMobile = useIsMobile(1024);
  const [open, setOpen] = useState(!isMobile);
  const toggle = () => setOpen((v) => !v);
  const className = cx(styles.nav, { [styles.open]: open });
  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <MobileDrawer open={open} toggle={toggle}>
          {children}
        </MobileDrawer>
      ) : (
        <nav className={className}>{children}</nav>
      )}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
      >
        <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} />
      </button>
    </div>
  );
}

MobileDrawer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  toggle: PropTypes.func,
};

Sidenav.propTypes = {
  children: PropTypes.node,
};
