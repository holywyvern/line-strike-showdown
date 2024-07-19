import { useEffect, useState } from "react";

export function useElementSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      setWidth(ref.clientWidth);
      const h = Math.min(580, ref.parentNode.clientHeight - 64)
      setHeight(h);
      setScale((ref.parentNode.clientHeight - 64) / h)
    };

    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  return { setRef, width, height, scale };
}
