import PropTypes from "prop-types";
import { useElementSize } from "../../hooks/useElementSize";

export function SizeChecker({ children }) {
  const { setRef, scale } = useElementSize();
  return (
    <div
      data-caca="CACA"
      ref={setRef}
      style={{
        "--lane-scale": scale,
        display: "flex",
        alignSelf: "stretch"
      }}
    >
      {children}
    </div>
  );
}

SizeChecker.propTypes = {
  children: PropTypes.node,
};
