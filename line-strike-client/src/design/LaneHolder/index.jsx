import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useElementSize } from "../../hooks/useElementSize";

export function LaneHolder({ children }) {
  const { setRef, height, scale } = useElementSize();
  return (
    <div ref={setRef} className={styles.lanes} style={{ "--h": height, "--lane-scale": scale }}>
      {children}
    </div>
  );
}

LaneHolder.propTypes = {
  children: PropTypes.children,
};
