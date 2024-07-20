import { useEffect, useState } from "react";

const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 1080;

export function useComponentScale() {
  const [ref, setRef] = useState(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!ref) return;

    const onResize = () => {
      const newScale = Math.min(
        ref.clientWidth / VIEW_WIDTH,
        ref.clientHeight / VIEW_HEIGHT
      );

      setScale(newScale);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  return { setRef, scale, width: VIEW_WIDTH, height: VIEW_HEIGHT };
}
