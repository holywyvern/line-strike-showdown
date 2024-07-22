import Drawer from "react-modern-drawer";

import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import { useState } from "react";

export function CollectionDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((v) => !v);
  return (
    <>
      <button className={styles.button} type="button" onClick={toggleDrawer}>
        Filters
      </button>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        size={350}
        direction="right"
        className={styles.drawer}
      >
        <div className={styles.title}>
          <h2>Filters</h2>
          <button className={styles.close} type="button" onClick={toggleDrawer}>
            &times;
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </Drawer>
    </>
  );
}

CollectionDrawer.propTypes = {
  children: PropTypes.node,
};
