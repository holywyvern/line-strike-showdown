import { Outlet } from "react-router-dom";
import { useProfileState } from "./useProfileState";
import { ProfileContext } from "../../contexts/ProfileContext";
import { ProfileEnforcer } from "./ProfileEnforcer";

export function PlayLayout() {
  const profile = useProfileState();
  return (
    <ProfileContext.Provider value={profile}>
      <ProfileEnforcer>
        <Outlet />
      </ProfileEnforcer>
    </ProfileContext.Provider>
  );
}
