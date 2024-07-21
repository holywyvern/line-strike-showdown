import { Modal } from "../../../../design/Modal";

export function Waiting() {
  return (
    <Modal open fake>
      <span style={{ fontSize: "4em" }}>WAITING...</span>
    </Modal>
  );
}
