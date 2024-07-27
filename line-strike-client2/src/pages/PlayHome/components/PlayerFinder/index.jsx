import { useState } from "react";

import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { OnlinePlayersDialog } from "./OnlinePlayersDialog";
import { OfflinePlayersDialog } from "./OfflinePlayersDialog";

const WRAPPER_STYLE = {
  flex: "1 0 auto",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
};

const DIALOG_STYLE = {
  width: "100%",
};

export function PlayerFinder() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((v) => !v);
  return (
    <>
      <Button onClick={toggleModal}>Find a Player</Button>
      <Modal open={open} onClose={toggleModal}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap-reverse",
            gap: "var(--gap-md)",
            alignItems: "stretch",
            justifyContent: "stretch",
          }}
        >
          <div style={WRAPPER_STYLE}>
            <OnlinePlayersDialog onClose={toggleModal} style={DIALOG_STYLE} />
          </div>
          <div style={WRAPPER_STYLE}>
            <OfflinePlayersDialog onClose={toggleModal} style={DIALOG_STYLE} />
          </div>
        </div>
      </Modal>
    </>
  );
}
