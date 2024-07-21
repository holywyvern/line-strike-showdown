import { Button } from "../../design/Button";
import { Navbar } from "../../design/Navbar";
import { RangeInput } from "../../design/RangeInput";
import { useProfile } from "../../hooks/useProfile";
import { AppTabs } from "../AppTabs";

import useIsMobile from "useismobile";

export function AppNavbar() {
  const isMobile = useIsMobile();
  const profile = useProfile();
  return (
    !isMobile && (
      <Navbar>
        <Navbar.Title>
          <img src="icon.webp" alt="Line Strike Logo" />
          &nbsp; LINE STRIKE SHOWDOWN
        </Navbar.Title>
        <AppTabs />
        <Navbar.User>
          <span>
            Hey there, <strong>{profile.name}</strong>!
          </span>
          <Button onClick={() => profile.changeName("")} link>
            Change Profile
          </Button>
          <Button onClick={profile.toggleMusic}>
            Music: {profile.music ? "ON" : "OFF"}
          </Button>
          <RangeInput
            name="volume"
            min={0}
            max={100}
            value={profile.volume}
            onChange={(e) => profile.setVolume(e.target.valueAsNumber)}
            showValue
          />
        </Navbar.User>
      </Navbar>
    )
  );
}
