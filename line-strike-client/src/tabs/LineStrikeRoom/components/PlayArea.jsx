import PropTypes from "prop-types";

import { PlayMat } from "../design/PlayMat";
import { FaceDownHand } from "../design/FaceDownHand";

import { useBoard, useSchema } from "../context";

import { PlayerHand } from "./PlayerHand";
import { BattleLanes } from "./BattleLanes";

export function PlayArea({ player, mirror, playing }) {
  const { playmat, playmatOpacity, handSize, sleeve, ...data } =
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
