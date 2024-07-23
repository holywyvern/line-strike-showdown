import { useContext } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

import { Context } from "./context";

function ModalClose({ onClick }) {
  return (
    <button className={styles.close} onClick={onClick}>
      &times;
    </button>
  );
}

export function Modal({ open, onClose, children, fake }) {
  const node = useContext(Context);
  const className = cx(styles.modal, {
    [styles.open]: open,
    [styles.fake]: fake,
  });
  if (!node) return null;

  return createPortal(
    <div className={className} onClick={onClose}>
      <div className={styles.window} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    node
  );
}

Modal.Close = ModalClose;

ModalClose.propTypes = {
  onClick: PropTypes.func,
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  fake: PropTypes.bool,
};
