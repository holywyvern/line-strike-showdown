import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function LaneAttackValue({ value, won, lost, top }) {
  const [target, setTarget] = useState(value);
  const [delta, setDelta] = useState(0);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const v = isNaN(value) ? 0 : value;
    setTarget(v);
    let dt = Math.max(1, Math.abs(v - current) / 2);
    if (isNaN(dt)) {
      setDelta(v > current ? 1 : -1);
    } else {
      setDelta(dt);
    }
  }, [value, current]);
  useEffect(() => {
    if (current === target) return;

    setTimeout(() => {
      if (current > target) {
        setCurrent(Math.max(target, current - delta));
      } else {
        setCurrent(Math.min(target, current + delta));
      }
    }, 100);
  }, [current, target, delta]);
  const className = cx(styles.value, {
    [styles.won]: won,
    [styles.lost]: !won && lost,
    [styles.top]: top,
  });
  return <span className={className}>{current}</span>;
}

LaneAttackValue.propTypes = {
  value: PropTypes.number,
  won: PropTypes.bool,
  lost: PropTypes.bool,
  top: PropTypes.bool,
};
