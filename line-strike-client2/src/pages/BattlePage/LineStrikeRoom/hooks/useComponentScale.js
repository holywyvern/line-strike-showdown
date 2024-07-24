import { useEffect, useState } from "react";

const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 1080;

export function useComponentScale() {
  const [ref, setRef] = useState(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      const [v1, v2] = [
        ref.clientWidth / VIEW_WIDTH,
        ref.clientHeight / VIEW_HEIGHT,
      ];
      setScale(Math.min(v1, v2));
      setOpacity(1);
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
    opacity,
    width: VIEW_WIDTH,
    height: VIEW_HEIGHT,
  };
}
