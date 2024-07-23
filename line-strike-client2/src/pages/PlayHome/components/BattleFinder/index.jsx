import { useState } from "react";

import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { ActivesBattlesDialog } from "./ActiveBattlesDialog";

export function BattleFinder() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((v) => !v);
  return (
    <>
      <Button onClick={toggleModal}>Watch a Battle</Button>
      <Modal open={open} onClose={toggleModal}>
        <ActivesBattlesDialog onClose={toggleModal} />
      </Modal>
    </>
  );
}
