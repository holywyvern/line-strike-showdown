import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../design/Button";
import { Popover } from "../../../design/Popover";

import { AudioSettingsForm } from "./AudioSettingsForm";

export function AudioSettingsButton() {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen((v) => !v);
  return (
    <Popover
      open={open}
      onClose={onToggle}
      content={<AudioSettingsForm />}
      positions={["bottom"]}
      align="end"
      transform={{ left: 12 }}
    >
      <Button onClick={onToggle}>
        <FontAwesomeIcon icon={faMusic} />
      </Button>
    </Popover>
  );
}
