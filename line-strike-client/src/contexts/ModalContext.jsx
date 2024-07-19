import { useContext, useState } from "react";
import PropTypes from "prop-types";

import { Context } from "../design/Modal/context";

export function ModalContextWrapper({ children }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        alignSelf: "stretch",
        justifySelf: "stretch",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export function ModalContext({ children, visible }) {
  const parent = useContext(Context);
  const [ref, setRef] = useState();
  return (
    <Context.Provider value={ref || parent}>
      <div
        ref={setRef}
        style={{
          position: "absolute",
          display: visible ? "flex" : "none",
          inset: 0,
          overflow: "hidden",
        }}
      />
      <div
        style={{
          position: "absolute",
          display: visible ? "flex" : "none",
          inset: 0,
          overflow: "auto",
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}

ModalContext.Wrapper = ModalContextWrapper;

ModalContextWrapper.propTypes = {
  children: PropTypes.node,
};

ModalContext.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};
