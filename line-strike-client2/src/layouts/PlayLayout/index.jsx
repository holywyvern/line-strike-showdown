import { Outlet } from "react-router-dom";

import { useProfileState } from "./useProfileState";

import { ProfileContext } from "../../contexts/ProfileContext";
import { TabContext } from "../../contexts/TabContext";

import { ProfileEnforcer } from "./components/ProfileEnforcer";

import { useTabState } from "./useTabState";

import { PlayPage } from "./design/PlayPage";

export function PlayLayout() {
  const profile = useProfileState();
  const tabs = useTabState();
  return (
    <ProfileContext.Provider value={profile}>
      <ProfileEnforcer>
        <TabContext.Provider value={tabs}>
          <PlayPage>
            <Outlet />
          </PlayPage>
        </TabContext.Provider>
      </ProfileEnforcer>
    </ProfileContext.Provider>
  );
}
