import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

import { Label } from "../../../../design/Label";

function TimeCounter({ start }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (typeof start !== "number") return;

    const interval = setInterval(() => setNow(Date.now()), 1_000);
    return () => {
      clearInterval(interval);
    };
  }, [start]);
  if (!start) return <div className={styles.info}>---</div>;

  const delta = Math.floor(Math.max(0, now - start) / 1000);

  let seconds = String(delta % 60);
  if (seconds.length < 2) seconds = `0${seconds}`;

  let minutes = String(Math.floor(delta / 60));
  if (minutes.length < 2) minutes = `0${minutes}`;

  return (
    <div className={styles.info}>
      {minutes}:{seconds}
    </div>
  );
}

export function MatchmakerColumns({ type, start }) {
  return (
    <div className={styles.grid}>
      <Label>Queue Time:</Label>
      <TimeCounter start={start} />
      <Label>Matchmaking Type:</Label>
      <div className={styles.info}>{type || "---"}</div>
    </div>
  );
}

TimeCounter.propTypes = {
  start: PropTypes.number,
};

MatchmakerColumns.propTypes = {
  type: PropTypes.string,
  start: PropTypes.number,
};
