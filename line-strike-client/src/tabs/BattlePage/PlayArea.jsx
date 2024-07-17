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
import { TurnButton } from "../TurnButton";

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
        <Column centerChildren>
          <span>{opponent?.name}</span>
          <TurnButton player={me} />
          <span>{me?.name}</span>
        </Column>
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
