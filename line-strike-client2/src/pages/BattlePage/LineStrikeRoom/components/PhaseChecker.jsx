import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  useBattleRoom,
  useBattleRoomState,
  useBoard,
  usePlayers,
} from "../context";

import { BattleLayout } from "../design/BattleLayout";
import { BattleButton } from "../design/BattleButton";
import { CircularProgress } from "../design/CircularProgress";
import { LineStrikeGuide } from "../design/LineStrikeGuide";
import { Waiting } from "../design/Waiting";

import { Board } from "./Board";
import { DeckSelection } from "./DeckSelection";
import { Viewport } from "./Viewport";
import { HandSelector } from "./HandSelector";
import { UndoActionButton } from "./UndoActionButton";

import { HoveredCard } from "./HoveredCard";

import { MessageListener } from "./MessageListener";

import { useDatabase } from "../../../../contexts/DatabaseContext";
import { useTabs } from "../../../../contexts/TabContext";

export function PhaseChecker({ spectator, index }) {
  const tabs = useTabs();
  const [finished, setFinished] = useState(false);
  const { formats } = useDatabase();
  const room = useBattleRoom();
  const { phase, musicName, turnTimeLeft, formatID } = useBattleRoomState();
  const { bottom } = usePlayers();
  const { locked } = useBoard(bottom, false, !spectator);
  const format = formats[formatID];
  const rate = turnTimeLeft / (format.turnSeconds * 1000);

  useEffect(() => {
    if (phase !== "finished") return;
    if (finished) return;

    setFinished(true);
    tabs.removeWarning(index);
  }, [phase, index, tabs, finished]);

  useEffect(() => {
    tabs.changeMusic(index, musicName);
  }, [tabs, index, musicName]);

  if (phase === "intro") {
    if (spectator) {
      return <Waiting />;
    }
    return (
      <BattleLayout>
        <DeckSelection />
      </BattleLayout>
    );
  }
  if (phase === "firstDraw") {
    if (spectator) {
      return <Waiting />;
    }
    return (
      <BattleLayout>
        <HandSelector />
      </BattleLayout>
    );
  }

  const onTurnLock = () => {
    room.send("ready");
  };

  return (
    <BattleLayout>
      <MessageListener>
        <Viewport>
          <LineStrikeGuide>
            <HoveredCard />
            <Board />
            <CircularProgress rate={1 - rate} />
            <BattleButton
              onClick={onTurnLock}
              disabled={Boolean(locked || phase !== "planning")}
            />
            {!spectator && <UndoActionButton />}
          </LineStrikeGuide>
        </Viewport>
      </MessageListener>
    </BattleLayout>
  );
}

PhaseChecker.propTypes = {
  spectator: PropTypes.bool,
  index: PropTypes.number,
};
