import PropTypes from "prop-types";
import { useState } from "react";

import { Context } from "../../../../design/Modal/context";

import styles from "./styles.module.scss";

export function ModalContext({ children }) {
  const [ref, setRef] = useState(null);
  return (
    <Context.Provider value={ref}>
      <>
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
          <div ref={setRef} className={styles.modal} />
        </div>
      </>
    </Context.Provider>
  );
}

ModalContext.propTypes = {
  children: PropTypes.node,
};
