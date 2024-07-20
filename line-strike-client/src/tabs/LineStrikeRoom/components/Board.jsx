import { usePlayers } from "../context";

import { LaneAttacks } from "./LaneAttacks";
import { PlayArea } from "./PlayArea";
import { PlayerLife } from "./PlayerLife";

export function Board() {
  const { top, bottom, playing } = usePlayers();
  return (
    <>
      <PlayArea player={top} mirror />
      <PlayArea player={bottom} playing={playing} />
      <LaneAttacks top={top} bottom={bottom} playing={playing} />
      <PlayerLife player={top} top />
      <PlayerLife player={bottom} playing={playing} />
    </>
  );
}
