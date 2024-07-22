import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useBattleRoom } from "../context";

import { Animation } from "../design/Animation";

export function AnimationPlayer({ playerID, position }) {
  const [ready, setReady] = useState(false);
  const [animation, setAnimation] = useState(null);

  const room = useBattleRoom();

  useEffect(() => {
    if (ready) return;

    room.onMessage("animation", (animation) => {
      if (animation.playerID !== playerID) return;
      if (animation.position !== position) return;

      console.log("YES", playerID, position, animation);
      setAnimation(animation.name);
      setTimeout(() => {
        setAnimation(null);
      }, 1000);
    });
    setReady(true);
  }, [room, playerID, position, ready]);
  return <Animation name={animation} />;
}

AnimationPlayer.propTypes = {
  playerID: PropTypes.any,
  position: PropTypes.number,
};
