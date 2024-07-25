import PropTypes from "prop-types";

import useIsMobile from "useismobile";

export function MobileHeight({ children, height }) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div
        style={{
          maxHeight: height,
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-md)",
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
