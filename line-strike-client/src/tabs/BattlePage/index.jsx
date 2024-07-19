import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { BattleView } from "./BattleView";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";
import { CardInfo } from "./CardInfo";

import { Context, HoveredCard, useRoomState } from "./context";

import { BattleLayout } from "../../design/BattleLayout";
import { useTabs } from "../../hooks/useTabs";

const Index = createContext(0);

function PhaseChecker({ children }) {
  const { phase } = useRoomState();
  const tabs = useTabs();
  const index = useContext(Index);
  useEffect(() => {
    console.log(phase, "AHHHHHHH")
    if (phase !== "finished") return;

    tabs.removeWarning(index);
  }, [phase, index, tabs]);
  return <>{children}</>;
}

PhaseChecker.propTypes = {
  children: PropTypes.node,
};

export function BattlePage({ room, spectator, tabIndex }) {
  const [ready, setReady] = useState(false);
  const state = useState(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!room) return;
    if (!ready) return;

    return () => {
      room.leave();
    };
  }, [ready, room]);
  return (
    <HoveredCard.Provider value={state}>
      <Context.Provider value={room}>
        <BattleLayout>
          <Index.Provider value={tabIndex}>
            <PhaseChecker>
              <CardInfo />
              {spectator ? <BattleView /> : <PlayArea />}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  maxWidth: "350px",
                  alignSelf: "stretch",
                }}
              >
                <Chat />
              </div>
            </PhaseChecker>
          </Index.Provider>
        </BattleLayout>
      </Context.Provider>
    </HoveredCard.Provider>
  );
}

BattlePage.propTypes = {
  room: PropTypes.any,
  spectator: PropTypes.bool,
  tabIndex: PropTypes.number,
};
