import PropTypes from "prop-types";

import { usePlayerBoard, useRoom, useRoomState } from "./BattlePage/context";

import { useCards } from "../hooks/useCards";

import { Column } from "../design/Column";
import { Button } from "../design/Button";
import { CircularProgress } from "../design/CircularProgress";

export function TurnButton({ disabled, player }) {
  const room = useRoom();
  const { formats } = useCards();
  let { phase, turnTimeLeft, formatID } = useRoomState();
  const turn = usePlayerBoard(player, false, true);
  const format = formats[formatID];

  if (!format) return null;

  const rate = turnTimeLeft / (format.turnSeconds * 1000);
  const onClick = () => {
    room.send("ready");
  };
  return (
    <Column centerChildren>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignSelf: "start",
          transformOrigin: "center",
          "--x": "calc(var(--lane-scale, 1) * 2)",
          transform: `scale(var(--x), var(--x))`,
        }}
      >
        <CircularProgress rate={1 - rate} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Button
            round
            onClick={onClick}
            disabled={disabled || phase !== "planning" || turn.locked}
          >
            Battle!
          </Button>
        </div>
      </div>
    </Column>
  );
}

TurnButton.propTypes = {
  disabled: PropTypes.bool,
  player: PropTypes.any,
};
