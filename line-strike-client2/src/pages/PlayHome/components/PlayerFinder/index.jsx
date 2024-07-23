import { useState } from "react";

import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { OnlinePlayersDialog } from "./OnlinePlayersDialog";

export function PlayerFinder() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((v) => !v);
  return (
    <>
      <Button onClick={toggleModal}>Find a Player</Button>
      <Modal open={open} onClose={toggleModal}>
        <OnlinePlayersDialog onClose={toggleModal} />
      </Modal>
    </>
  );
}
