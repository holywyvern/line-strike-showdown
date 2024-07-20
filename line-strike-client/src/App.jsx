import "./App.css";

import { Loader } from "./components/Loader";
import { NameEnforcer } from "./components/NameEnforcer";

import { AssetContext } from "./contexts/AssetContext";
import { CardContext } from "./contexts/CardContext";
import { LobbyContext } from "./contexts/LobbyContext";
import { ProfileContext } from "./contexts/ProfileContext";
import { TabContext } from "./contexts/TabContext";

import { LineStrikePage } from "./LineStrikePage";

function App() {
  return (
    <>
      <CardContext>
        <AssetContext>
          <ProfileContext>
            <Loader>
              <NameEnforcer>
                <TabContext>
                  <LobbyContext>
                    <LineStrikePage />
                  </LobbyContext>
                </TabContext>
              </NameEnforcer>
            </Loader>
          </ProfileContext>
        </AssetContext>
      </CardContext>
    </>
  );
}

export default App;
