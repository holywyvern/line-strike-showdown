import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function PlayMat({ mirror, name = "blue_basic.webp", opacity = 1 }) {
  const className = cx(styles.mat, { [styles.mirror]: mirror });
  return (
    <img className={className} style={{ opacity }} src={`playmats/${name}`} />
  );
}

PlayMat.propTypes = {
  mirror: PropTypes.bool,
  name: PropTypes.string,
  opacity: PropTypes.number,
};
