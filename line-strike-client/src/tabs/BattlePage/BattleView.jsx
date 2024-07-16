import { Column } from "../../design/Column";
import { Row } from "../../design/Row";
import { BattleLanes } from "./BattleLanes";

import { useRoomState } from "./context";
import { FaceDownHand } from "./FaceDownHand";
import { PlayerDeck } from "./PlayerDeck";

export function BattleView() {
  const state = useRoomState();
  return (
    <>
      <BattleLanes playerA={state.playerA} playerB={state.playerB} />
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
    </>
  );
}
