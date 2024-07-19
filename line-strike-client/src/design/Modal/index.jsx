import { useContext } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";
import { Box } from "../Box";

import { Context } from "./context";

export function Modal({ open, onClose, children, title }) {
  const node = useContext(Context);
  const className = cx(styles.modal, { [styles.open]: open });
  return createPortal(
    <div className={className} onClick={onClose}>
      <div className={styles.window} onClick={(e) => e.stopPropagation()}>
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
    node
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};
