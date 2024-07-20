import { forwardRef } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

function Screen({ children, scale, width, height }, ref) {
  return (
    <div
      ref={ref}
      className={styles.screen}
      style={{
        "--scale": scale,
        "--width": width,
        "--height": height,
      }}
    >
      {children}
    </div>
  );
}

Screen.propTypes = {
  children: PropTypes.node,
  scale: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const LineStrikeScreen = forwardRef(Screen);
