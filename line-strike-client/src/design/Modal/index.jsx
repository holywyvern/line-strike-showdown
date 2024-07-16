import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { Box } from "../Box";
import { createPortal } from "react-dom";

export function Modal({ open, onClose, children, title }) {
  const className = cx(styles.modal, { [styles.open]: open });
  return createPortal(
    <div className={className}>
      <div className={styles.window}>
        <Box>
          <Box.Header>
            <div className={styles.title}>
              <h3>{title}</h3>
              {onClose && (
                <button className={styles.button} onClick={onClose}>
                  &times;
                </button>
              )}
            </div>
          </Box.Header>
          <Box.Body>
            <div className={styles.content}>{children}</div>
          </Box.Body>
        </Box>
      </div>
    </div>,
    document.getElementById("modals")
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};
