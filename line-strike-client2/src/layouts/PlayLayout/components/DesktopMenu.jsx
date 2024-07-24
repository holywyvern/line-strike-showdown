import { useProfile } from "../../../contexts/ProfileContext";
import { RightMenu } from "../design/RightMenu";
import { PlayTabs } from "./PlayTabs";
import { Settings } from "./Settings";

export function DesktopMenu() {
  const profile = useProfile();
  return (
    <>
      <PlayTabs />
      <RightMenu>
        <span>
          Hey there, <strong>{profile.name}</strong>!
        </span>
        <Settings />
      </RightMenu>
    </>
  );
}
