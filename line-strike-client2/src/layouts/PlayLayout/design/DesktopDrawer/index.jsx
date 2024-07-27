import Drawer from "react-modern-drawer";

import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function DesktopDrawer({ open, children, onClose }) {
  return (
    <Drawer
      direction="right"
      open={open}
      size={400}
      className={styles.drawer}
      onClose={onClose}
    >
      {children}
    </Drawer>
  );
}

DesktopDrawer.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
