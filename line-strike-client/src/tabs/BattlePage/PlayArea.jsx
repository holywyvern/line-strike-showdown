import { useRoom, useRoomState } from "./context";

import { IntroPhase } from "./phases/IntroPhase";
import { FirstDrawPhase } from "./phases/FirstDrawPhase";

import { Column } from "../../design/Column";
import { Row } from "../../design/Row";

import { BattleLanes } from "./BattleLanes";
import { FaceDownHand } from "./FaceDownHand";
import { PlayerDeck } from "./PlayerDeck";

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
      <BattleLanes playerA={opponent} playerB={me} />
      <Column stretch spaceItems>
        <Row>
          <FaceDownHand player={state.playerA} />
          <PlayerDeck player={state.playerA} />
        </Row>
        <Row spaceItems>
          <span>{state.playerA?.name}</span>
          <strong>Vs</strong>
          <span>{state.playerB?.name}</span>
        </Row>
        <Row>
          <FaceDownHand player={state.playerB} />
          <PlayerDeck player={state.playerB} />
        </Row>
      </Column>
      <Component />
    </>
  );
}
