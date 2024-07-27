import Drawer from "react-modern-drawer";

import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function FullscreenDrawer({ open, children, onClose }) {
  return (
    <Drawer direction="right" size="100vw" open={open} className={styles.drawer} onClose={onClose}>
      {children}
    </Drawer>
  );
}

FullscreenDrawer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
