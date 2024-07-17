import PropTypes from "prop-types";

import { Button } from "../../design/Button";

import { usePlayerState, useRoom, useRoomState } from "./context";

export function UndoButton({ turn }) {
  const { phase } = useRoomState();
  const { actions, locked } = usePlayerState(turn);
  const room = useRoom();
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "-25%",
        transform: "translateY(-50%)",
      }}
    >
      <Button
        disabled={
          phase !== "planning" || locked || !actions || actions.length < 1
        }
        onClick={() => room.send("undo")}
      >
        UNDO
      </Button>
    </div>
  );
}

UndoButton.propTypes = {
  turn: PropTypes.any,
};
