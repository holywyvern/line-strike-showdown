import { usePlayers } from "../context";

import { LaneAttacks } from "./LaneAttacks";
import { PlayArea } from "./PlayArea";
import { PlayerDeck } from "./PlayerDeck";
import { PlayerLife } from "./PlayerLife";
import { PlayerPpStatus } from "./PlayerPpStatus";

export function Board() {
  const { top, bottom, playing } = usePlayers();
  return (
    <>
      <PlayArea player={top} mirror />
      <PlayArea player={bottom} playing={playing} />
      <LaneAttacks top={top} bottom={bottom} playing={playing} />
      <PlayerLife player={top} top />
      <PlayerLife player={bottom} playing={playing} />
      <PlayerPpStatus player={top} top />
      <PlayerPpStatus player={bottom} playing={playing} />
      <PlayerDeck player={top} top />
      <PlayerDeck player={bottom} />
    </>
  );
}
