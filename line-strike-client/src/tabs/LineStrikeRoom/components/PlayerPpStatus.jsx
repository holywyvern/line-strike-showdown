import PropTypes from "prop-types";

import { PlayerPP } from "../design/PlayerPP";

import { useBattleRoomState, useSchema } from "../context";
import { useCards } from "../../../hooks/useCards";

export function PlayerPpStatus({ player, top, playing }) {
  const { formats } = useCards();
  const { formatID } = useBattleRoomState();
  const { pp } = useSchema(player);
  const format = formats[formatID];

  return <PlayerPP value={pp} top={top} max={format.maxPP} />;
}

PlayerPpStatus.propTypes = {
  player: PropTypes.any,
  playing: PropTypes.bool,
  top: PropTypes.bool,
};
