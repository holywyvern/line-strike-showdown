import { Button } from "../../../design/Button";

import { AudioSettingsButton } from "./AudioSettingsButton";
import { OtherSettingsButton } from "./OtherSettingsButton";

export function Settings() {
  return (
    <Button.Group>
      <AudioSettingsButton />
      <OtherSettingsButton />
    </Button.Group>
  );
}
