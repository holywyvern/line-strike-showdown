import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function Playmat({ children, mirror, name, opacity = 100 }) {
  const className = cx(styles.container, { [styles.mirror]: mirror });
  return (
    <div className={className}>
      <img
        src={`playmats/${name}`}
        style={{ "--opacity": opacity }}
        className={styles.img}
      />
      <div className={styles.lanes}>{children}</div>
    </div>
  );
}

Playmat.propTypes = {
  mirror: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  opacity: PropTypes.number,
};
