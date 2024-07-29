import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { useBattleRoom, useBattleRoomState } from "../context";

export function ReplayChecker() {
  const { replay, paused } = useBattleRoomState();
  const room = useBattleRoom();
  if (!replay) return;

  const onPlay = () => room.send("play");
  return (
    <Modal open={paused}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={onPlay}>PLAY</Button>
      </div>
    </Modal>
  );
}
