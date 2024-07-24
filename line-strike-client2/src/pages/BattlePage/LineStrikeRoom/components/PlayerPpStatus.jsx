import PropTypes from "prop-types";

import { PlayerPP } from "../design/PlayerPP";

import { useBattleRoomState, useBoard, useSchema } from "../context";
import { useDatabase } from "../../../../contexts/DatabaseContext";

export function PlayerPpStatus({ player, top, playing }) {
  const { formats } = useDatabase();
  const { formatID } = useBattleRoomState();
  let { pp } = useSchema(player);
  const { usedPP } = useBoard(player, top, playing);
  const format = formats[formatID];
  if (playing) {
    pp -= usedPP;
  }
  return <PlayerPP value={pp} top={top} max={format.maxPP} />;
}

PlayerPpStatus.propTypes = {
  player: PropTypes.any,
  playing: PropTypes.bool,
  top: PropTypes.bool,
};
