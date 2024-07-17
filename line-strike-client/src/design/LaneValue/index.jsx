import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

import { useEffect, useState } from "react";

function AnimatedCounter({ value }) {
  const [amount, setAmount] = useState(value);
  const [target, setTarget] = useState(value);
  const [delta, setDelta] = useState(0);
  useEffect(() => {
    setTarget(value);
    setDelta(Math.max(1, Math.abs(value - amount) / 2));
  }, [value, amount]);
  useEffect(() => {
    if (amount === target) return;

    setTimeout(() => {
      if (amount > target) {
        setAmount(Math.max(target, amount - delta));
      } else {
        setAmount(Math.min(target, amount + delta));
      }
    }, 100);
  }, [amount, target, delta]);
  return <>{Math.floor(amount)}</>;
}

AnimatedCounter.propTypes = {
  value: PropTypes.number,
};

export function LaneValue({ lane, other, main }) {
  const className = cx(styles.lane, {
    [styles.dead]: lane.hp < 1,
    [styles.strong]:
      lane.attack > 0 && (other.hp < 1 || other.attack <= lane.attack),
    [styles.main]: main,
  });
  return (
    <div className={className}>
      <AnimatedCounter value={lane.attack} />
    </div>
  );
}

LaneValue.propTypes = {
  lane: PropTypes.any,
  other: PropTypes.any,
  main: PropTypes.bool,
};
