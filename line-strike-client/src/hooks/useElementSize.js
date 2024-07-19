import { useEffect, useState } from "react";

export function useElementSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      setWidth(ref.clientWidth);
      setHeight(
        ref.parentNode.clientHeight - 64 - 16 * ref.parentNode.clientHeight / 120
      );
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  return { setRef, width, height };
}
