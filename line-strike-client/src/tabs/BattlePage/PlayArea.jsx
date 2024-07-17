import { useRoom, useRoomState } from "./context";

import { IntroPhase } from "./phases/IntroPhase";
import { FirstDrawPhase } from "./phases/FirstDrawPhase";

import { Column } from "../../design/Column";
import { Row } from "../../design/Row";

import { BattleLanes } from "./BattleLanes";
import { FaceDownHand } from "./FaceDownHand";
import { PlayerDeck } from "./PlayerDeck";
import { PlayerPP } from "./PlayerPP";
import { PlayerHand } from "./PlayerHand";

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
      <BattleLanes playerA={opponent} playerB={me} useTurn />
      <Column stretch spaceItems>
        <Column>
          <FaceDownHand player={opponent} />
          <Row spaceItems>
            <PlayerPP player={opponent} />
            <PlayerDeck player={opponent} />
          </Row>
        </Column>
        <Row spaceItems>
          <span>{opponent?.name}</span>
          <strong>Vs</strong>
          <span>{me?.name}</span>
        </Row>
        <Column>
          <Row spaceItems>
            <PlayerPP player={me} useTurn />
            <PlayerDeck player={me} />
          </Row>
          <PlayerHand player={me} />
        </Column>
      </Column>
      <Component />
    </>
  );
}
