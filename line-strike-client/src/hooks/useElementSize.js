import { useEffect, useState } from "react";

export function useElementSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      setWidth(ref.clientWidth);
      setHeight(Math.min(548, ref.parentNode.clientHeight - 32));
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  return { setRef, width, height };
}
