import { Column } from "../../design/Column";
import { Row } from "../../design/Row";
import { BattleLanes } from "./BattleLanes";

import { useRoomState } from "./context";
import { FaceDownHand } from "./FaceDownHand";
import { PlayerDeck } from "./PlayerDeck";
import { PlayerPP } from "./PlayerPP";

export function BattleView() {
  const state = useRoomState();
  return (
    <>
      <BattleLanes playerA={state.playerA} playerB={state.playerB} />
      <Column stretch spaceItems>
        <Column>
          <FaceDownHand player={state.playerA} />
          <Row spaceItems>
            <PlayerPP player={state.playerA} />
            <PlayerDeck player={state.playerA} />
          </Row>
        </Column>
        <Row spaceItems>
          <span>{state.playerA?.name}</span>
          <strong>Vs</strong>
          <span>{state.playerB?.name}</span>
        </Row>
        <Column>
          <Row spaceItems>
            <PlayerPP player={state.playerB} />
            <PlayerDeck player={state.playerB} />
          </Row>
          <FaceDownHand player={state.playerB} />
        </Column>
      </Column>
    </>
  );
}
