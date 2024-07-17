import PropTypes from "prop-types";

import { Button } from "../../design/Button";

import { usePlayerState, useRoom } from "./context";

export function UndoButton({ turn }) {
  const { actions } = usePlayerState(turn);
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
        disabled={!actions || actions.length < 1}
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
