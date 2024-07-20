import PropTypes from "prop-types";

import { PlayerLifeHolder } from "../design/PlayerLifeHolder";

import { useBoard } from "../context";

import { LaneLife } from "./LaneLife";

export function PlayerLife({ player, top, playing }) {
  const { lanes } = useBoard(player, top, playing);
  return (
    <PlayerLifeHolder top={top}>
      {lanes.map((lane, index) => (
        <LaneLife key={index} lane={lane} top={top} />
      ))}
    </PlayerLifeHolder>
  );
}

PlayerLife.propTypes = {
  player: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
};
