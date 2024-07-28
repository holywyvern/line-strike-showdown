import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../design/Button";
import { DesktopDrawer } from "../design/DesktopDrawer";
import { LinkForm } from "./LinkForm";

export function OtherSettingsButton() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  return (
    <>
      <DesktopDrawer open={open} onClose={toggle}>
        <h3>Link Settings</h3>
        <LinkForm onNavigate={() => setOpen(false)} />
      </DesktopDrawer>
      <Button onClick={toggle}>
        <FontAwesomeIcon icon={faCog} />
      </Button>
    </>
  );
}
