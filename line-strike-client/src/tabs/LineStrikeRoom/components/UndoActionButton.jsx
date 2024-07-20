import {
  useBattleRoom,
  useBattleRoomState,
  useBoard,
  usePlayers,
} from "../context";
import { UndoButton } from "../design/UndoButton";

export function UndoActionButton() {
  const room = useBattleRoom();
  const { bottom } = usePlayers();
  const { phase } = useBattleRoomState();
  const { actions } = useBoard(bottom, false, true);
  const onUndo = () => {
    room.send("undo");
  };
  return (
    <UndoButton
      onClick={onUndo}
      disabled={actions.length < 1 || phase !== "planning"}
    />
  );
}
