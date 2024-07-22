import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { PlayMat } from "../design/PlayMat";
import { FaceDownHand } from "../design/FaceDownHand";
import { StayingMessage } from "../design/StayingMessage";

import { useBattleRoom, useBoard, useSchema } from "../context";

import { PlayerHand } from "./PlayerHand";
import { BattleLanes } from "./BattleLanes";

function Stay({ top, sessionID }) {
  const room = useBattleRoom();
  const [staying, setStaying] = useState(false);
  useEffect(() => {
    room.onMessage("stay", ({ playerID }) => {
      if (playerID !== sessionID) return;

      setStaying(true);
      setTimeout(() => {
        setStaying(false);
      }, 2000);
    });
  }, [room, sessionID]);
  return <StayingMessage visible={staying} top={top} />;
}

Stay.propTypes = {
  top: PropTypes.bool,
  sessionID: PropTypes.any,
};

export function PlayArea({ player, mirror, playing }) {
  const { sessionID, playmat, playmatOpacity, handSize, sleeve, ...data } =
    useSchema(player);
  const board = useBoard(data, mirror, playing);

  return (
    <>
      <PlayMat
        mirror={mirror}
        name={playmat}
        opacity={(playmatOpacity || 0) / 100}
      />
      <BattleLanes lanes={board.lanes} top={mirror} playing={playing} />
      <Stay sessionID={sessionID} top={mirror} />
      {playing ? (
        <PlayerHand />
      ) : (
        <FaceDownHand handSize={handSize} mirror={mirror} sleeve={sleeve} />
      )}
    </>
  );
}

PlayArea.propTypes = {
  player: PropTypes.any,
  mirror: PropTypes.bool,
  playing: PropTypes.bool,
};
