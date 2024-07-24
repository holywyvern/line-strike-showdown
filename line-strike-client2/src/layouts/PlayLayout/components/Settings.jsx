import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../design/Button";
import { AudioSettingsButton } from "./AudioSettingsButton";

export function Settings() {
  return (
    <Button.Group>
      <AudioSettingsButton />
      <Button disabled>
        <FontAwesomeIcon icon={faCog} />
      </Button>
    </Button.Group>
  );
}
