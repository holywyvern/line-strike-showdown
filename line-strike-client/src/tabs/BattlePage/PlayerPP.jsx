import PropTypes from "prop-types";
import { usePlayerBoard, usePlayerState, useRoomState } from "./context";
import { useCards } from "../../hooks/useCards";
import { PpDiamond } from "../../design/PpDiamond";

export function PlayerPP({ player, useTurn }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const turn = usePlayerBoard(player, false, useTurn);
  const state = usePlayerState(player);
  const format = formats[formatID];
  if (!format) return;

  return <PpDiamond format={format} pp={state.pp - turn.usedPP} />;
}

PlayerPP.propTypes = {
  player: PropTypes.any,
  useTurn: PropTypes.bool,
};
