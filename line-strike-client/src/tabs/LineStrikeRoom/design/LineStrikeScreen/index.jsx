import { forwardRef } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

// eslint-disable-next-line react/prop-types
function Screen({ children, scale, width, height }, ref) {
  return (
    <div
      ref={ref}
      className={styles.screen}
      style={{
        "--scale": scale,
        "--width": width,
        "--height": height,
        "--scaled-width": width * scale,
        "--scaled-height": height * scale,
      }}
    >
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}

export const LineStrikeScreen = forwardRef(Screen);

LineStrikeScreen.propTypes = {
  children: PropTypes.node,
  scale: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
