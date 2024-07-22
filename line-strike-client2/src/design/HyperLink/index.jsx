import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function HyperLink({ children, external, to }) {
  return (
    <a
      className={styles.link}
      href={to}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

HyperLink.propTypes = {
  children: PropTypes.node,
  external: PropTypes.bool,
  to: PropTypes.string,
};
