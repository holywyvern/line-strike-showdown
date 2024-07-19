import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Box } from "../../design/Box";
import { Button } from "../../design/Button";
import { Grid } from "../../design/Grid";

import { useLobby } from "../../hooks/useLobby";
import { useProfile } from "../../hooks/useProfile";

function SecondCounter({ since }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1_000);
    return () => {
      clearInterval(interval);
    };
  });
  const elapsed = Math.max(0, Math.floor((now - since) / 1_000));

  let s = String(elapsed % 60);
  let m = String(Math.floor(elapsed / 60));
  if (s.length < 2) {
    s = `0${s}`;
  }
  if (m.length < 2) {
    m = `0${m}`;
  }
  return `${m}:${s}`;
}

SecondCounter.propTypes = {
  since: PropTypes.number,
};

export function MatchFinder() {
  const { formatID } = useProfile();
  const { queue, room, cancelQueue } = useLobby();

  const onRanked = () => {
    room.send("ranked", formatID);
  };
  const onUnranked = () => {
    room.send("unranked", formatID);
  };

  const onCancel = () => {
    cancelQueue();
  };

  return (
    <Box>
      <Box.Header>
        <h2>Battle Finder</h2>
      </Box.Header>
      <Box.Body>
        <Grid columnFormat="auto 1fr">
          <strong>In Queue:</strong>
          <div style={{ justifySelf: "end" }}>{queue?.type || "No"}</div>
          <strong>Matchmaking time:</strong>
          <div style={{ justifySelf: "end" }}>
            {queue ? <SecondCounter since={queue.since} /> : "---"}
          </div>
        </Grid>
        <hr style={{ width: "100%" }} />
        <Button disabled onClick={onRanked}>
          Ranked Battle
        </Button>
        <Button disabled={Boolean(queue)} onClick={onUnranked}>
          Unranked Battle
        </Button>
        <Button disabled={!queue} onClick={onCancel}>
          Cancel Queue
        </Button>
      </Box.Body>
    </Box>
  );
}
