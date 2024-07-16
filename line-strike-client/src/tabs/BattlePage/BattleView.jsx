import { Column } from "../../design/Column";

import { useRoomState } from "./context";
import { LaneAttack } from "./LaneAttack";

import { PlayerArea } from "./PlayerArea";

export function BattleView() {
  const state = useRoomState();
  return (
    <Column flex>
      <PlayerArea mirror player={state.playerA} />
      <LaneAttack playerA={state.playerA} playerB={state.playerB} />
      <PlayerArea player={state.playerB} />
    </Column>
  );
}
