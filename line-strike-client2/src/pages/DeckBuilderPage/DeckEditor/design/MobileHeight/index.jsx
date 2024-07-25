import PropTypes from "prop-types";

import useIsMobile from "useismobile";

export function MobileHeight({ children, height }) {
  const isMobile = useIsMobile(1024);
  if (isMobile) {
    return (
      <div
        style={{
          maxHeight: height,
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-md)",
          border: "var(--border-size-xs) solid var(--dialog-border-color)"
        }}
      >
        {children}
      </div>
    );
  }
  return <>{children}</>;
}

MobileHeight.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
};
