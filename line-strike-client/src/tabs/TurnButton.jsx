import PropTypes from "prop-types";
import { usePlayerBoard, useRoom, useRoomState } from "./BattlePage/context";
import { useCards } from "../hooks/useCards";
import { Column } from "../design/Column";
import { Button } from "../design/Button";

export function TurnButton({ disabled, player }) {
  const room = useRoom();
  const { formats } = useCards();
  let { phase, turnTimeLeft, formatID } = useRoomState();
  const turn = usePlayerBoard(player, false, true);
  const format = formats[formatID];

  if (!format) return null;

  console.log(turn, turn.locked);

  const rate = turnTimeLeft / format.turnSeconds;
  const onClick = () => {
    room.send("ready");
  };
  return (
    <Column centerChildren>
      <Button
        onClick={onClick}
        disabled={disabled || phase !== "planning" || turn.locked}
      >
        Battle!
      </Button>
      <progress value={rate} max={1} />
    </Column>
  );
}

TurnButton.propTypes = {
  disabled: PropTypes.bool,
  player: PropTypes.any,
};
