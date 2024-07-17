import PropTypes from "prop-types";
import { usePlayerState, useRoomState } from "./context";
import { useCards } from "../../hooks/useCards";
import { PpDiamond } from "../../design/PpDiamond";

export function PlayerPP({ player, useTurn }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const turn = usePlayerState(player.turn);
  const state = usePlayerState(player);
  const format = formats[formatID];
  if (!format) return;

  const pp = useTurn ? state.pp - turn.usedPP : state.pp;
  return <PpDiamond format={format} pp={pp} />;
}

PlayerPP.propTypes = {
  player: PropTypes.any,
  useTurn: PropTypes.bool,
};
