import { useProfile } from "../../../contexts/ProfileContext";
import { Checkbox } from "../../../design/Checkbox";

import { Label } from "../../../design/Label";
import { RangeInput } from "../../../design/RangeInput";

export function AudioSettingsForm() {
  const { music } = useProfile();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Label htmlFor="bgm">Music</Label>
      <RangeInput
        name="bgm"
        min={0}
        max={100}
        value={music.bgm}
        onChange={(e) => music.setBGM(e.target.valueAsNumber)}
        showValue
      />
      <Label htmlFor="sfx">Sound Effects</Label>
      <RangeInput
        name="sfx"
        min={0}
        max={100}
        value={music.sfx}
        onChange={(e) => music.setSFX(e.target.valueAsNumber)}
        showValue
      />
      <Label htmlFor="notifications">Notifications</Label>
      <RangeInput
        name="notifications"
        min={0}
        max={100}
        value={music.notifications}
        onChange={(e) => music.setNotifications(e.target.valueAsNumber)}
        showValue
      />
      <Checkbox name="mute" checked={music.muted} onChange={music.toggle}>
        Mute all sounds
      </Checkbox>
    </form>
  );
}
