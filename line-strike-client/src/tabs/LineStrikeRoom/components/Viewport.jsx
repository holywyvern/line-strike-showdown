import PropTypes from "prop-types";

import { LineStrikeScreen } from "../design/LineStrikeScreen";

import { useComponentScale } from "../hooks/useComponentScale";

export function Viewport({ children }) {
  const { setRef, scale, width, height } = useComponentScale();
  return (
    <LineStrikeScreen ref={setRef} scale={scale} width={width} height={height}>
      {children}
    </LineStrikeScreen>
  );
}

Viewport.propTypes = {
  children: PropTypes.node,
};
