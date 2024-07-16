import PropTypes from "prop-types";
import { usePlayerState, useRoomState } from "./context";
import { useCards } from "../../hooks/useCards";
import { PpDiamond } from "../../design/PpDiamond";

export function PlayerPP({ player }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const { pp } = usePlayerState(player);
  const format = formats[formatID];
  if (!format) return;

  return <PpDiamond format={format} pp={pp} />;
}

PlayerPP.propTypes = {
  player: PropTypes.any,
};
