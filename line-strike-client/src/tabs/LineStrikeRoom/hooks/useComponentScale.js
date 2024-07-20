import { useEffect, useState } from "react";

const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 1080;

export function useComponentScale() {
  const [ref, setRef] = useState(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      const [v1, v2] = [
        ref.clientWidth / VIEW_WIDTH,
        ref.clientHeight / VIEW_HEIGHT,
      ];
      setScale(Math.min(v1, v2));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  return {
    setRef,
    scale,
    width: VIEW_WIDTH,
    height: VIEW_HEIGHT,
  };
}
