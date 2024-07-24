import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";

import { useProfileState } from "./useProfileState";

import { ProfileContext } from "../../contexts/ProfileContext";
import { TabContext } from "../../contexts/TabContext";

import { ProfileEnforcer } from "./components/ProfileEnforcer";

import { useTabState } from "./useTabState";

import { PlayPage } from "./design/PlayPage";
import {
  MatchmakeContext,
  useMatchmakeState,
} from "../../contexts/MatchmakeContext";
import { LobbyContext, useLobbyState } from "../../contexts/LobbyContext";
import { ModalContext } from "./design/ModalContext";
import {
  BattleContext,
  useBattleRoomState,
} from "../../contexts/BattleContext";

function Profile({ children }) {
  const profile = useProfileState();
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

Profile.propTypes = {
  children: PropTypes.node,
};

function Tabs({ children }) {
  const tabs = useTabState();
  return <TabContext.Provider value={tabs}>{children}</TabContext.Provider>;
}

Tabs.propTypes = {
  children: PropTypes.node,
};

function Lobby({ children }) {
  const lobby = useLobbyState();

  return (
    <LobbyContext.Provider value={lobby}>{children}</LobbyContext.Provider>
  );
}

Lobby.propTypes = {
  children: PropTypes.node,
};

function Matchmaker({ children }) {
  const match = useMatchmakeState();
  return (
    <MatchmakeContext.Provider value={match}>
      {children}
    </MatchmakeContext.Provider>
  );
}

Matchmaker.propTypes = {
  children: PropTypes.node,
};

function Battle({ children }) {
  const battle = useBattleRoomState();
  return (
    <BattleContext.Provider value={battle}>{children}</BattleContext.Provider>
  );
}

Battle.propTypes = {
  children: PropTypes.node,
};

export function PlayLayout() {
  return (
    <Profile>
      <ProfileEnforcer>
        <Tabs>
          <Lobby>
            <Matchmaker>
              <Battle>
                <PlayPage>
                  <ModalContext>
                    <Outlet />
                  </ModalContext>
                </PlayPage>
              </Battle>
            </Matchmaker>
          </Lobby>
        </Tabs>
      </ProfileEnforcer>
    </Profile>
  );
}
