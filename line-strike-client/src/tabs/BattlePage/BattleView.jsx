import { Column } from "../../design/Column";
import { Row } from "../../design/Row";
import { TurnButton } from "../TurnButton";
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
        <Column centerChildren>
          <TurnButton disabled />
        </Column>
        <Column>
          <Row spaceItems>
            <PlayerPP main player={state.playerB} />
            <PlayerDeck player={state.playerB} main />
          </Row>
          <FaceDownHand player={state.playerB} />
        </Column>
      </Column>
    </>
  );
}
