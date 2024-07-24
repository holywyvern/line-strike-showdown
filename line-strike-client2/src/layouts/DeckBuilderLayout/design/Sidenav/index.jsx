import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.scss";

export function Sidenav({ children }) {
  const [open, setOpen] = useState(true);
  const className = cx(styles.nav, { [styles.open]: open });
  return (
    <div className={styles.wrapper}>
      <nav className={className}>{children}</nav>
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

Sidenav.propTypes = {
  children: PropTypes.node,
};
