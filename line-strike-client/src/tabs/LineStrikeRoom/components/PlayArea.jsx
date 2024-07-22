import PropTypes from "prop-types";

import { PlayMat } from "../design/PlayMat";
import { FaceDownHand } from "../design/FaceDownHand";

import { useBattleRoom, useBoard, useSchema } from "../context";

import { PlayerHand } from "./PlayerHand";
import { BattleLanes } from "./BattleLanes";
import { useEffect, useState } from "react";
import { StayingMessage } from "../design/StayingMessage";

export function PlayArea({ player, mirror, playing }) {
  const room = useBattleRoom();
  const [staying, setStaying] = useState(false);
  const { sessionID, playmat, playmatOpacity, handSize, sleeve, ...data } =
    useSchema(player);
  const board = useBoard(data, mirror, playing);
  useEffect(() => {
    room.onMessage("stay", ({ playerID }) => {
      if (playerID !== sessionID) return;

      setStaying(true);
      setTimeout(() => {
        setStaying(false);
      }, 2000);
    });
  }, [room, sessionID]);
  return (
    <>
      <PlayMat
        mirror={mirror}
        name={playmat}
        opacity={(playmatOpacity || 0) / 100}
      />
      <BattleLanes lanes={board.lanes} top={mirror} playing={playing} />
      <StayingMessage visible={staying} top={mirror} />
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
