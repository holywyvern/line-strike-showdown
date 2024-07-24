import { Modal } from "../../../../../design/Modal";
import { Dialog } from "../../../../../design/Dialog";

export function Waiting() {
  return (
    <Modal open fake>
      <Dialog>
        <Dialog.Body>
          <span style={{ fontSize: "4em" }}>WAITING...</span>
        </Dialog.Body>
      </Dialog>
    </Modal>
  );
}
