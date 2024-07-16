import { useRoom, useRoomState } from "./context";

import { IntroPhase } from "./phases/IntroPhase";
import { FirstDrawPhase } from "./phases/FirstDrawPhase";
import { Column } from "../../design/Column";
import { PlayerArea } from "./PlayerArea";
import { LaneAttack } from "./LaneAttack";

const PHASES = {
  intro: IntroPhase,
  firstDraw: FirstDrawPhase,
};

const NoView = () => null;

export function PlayArea() {
  const room = useRoom();
  const state = useRoomState();

  const id = room?.sessionId;
  const me = state.playerA?.sessionID === id ? state.playerA : state.playerB;
  const opponent =
    state.playerB?.sessionID === id ? state.playerA : state.playerB;
  const Component = PHASES[state?.phase] || NoView;
  return (
    <>
      <Column flex>
        <PlayerArea mirror player={opponent} />
        <LaneAttack playerA={opponent} playerB={me} />
        <PlayerArea player={me} />
      </Column>
      <Component />
    </>
  );
}
