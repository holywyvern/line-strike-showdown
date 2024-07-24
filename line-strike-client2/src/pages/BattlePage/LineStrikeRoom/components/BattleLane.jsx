import { useEffect } from "react";
import PropTypes from "prop-types";

import { LaneContainer } from "../design/LaneContainer";

import { useBattleRoom, useSchema } from "../context";

import { LaneCard } from "./LaneCard";

export function BattleLane({ index, lane, top, playing }) {
  const room = useBattleRoom();
  const data = useSchema(lane);

  useEffect(() => {
    room.onMessage("attack", ({ playerID, index, blocked }) => {
      if (playerID !== data.playerID) return;
      if (data.position !== index) return;

      console.log("It's me", blocked);
    });
  }, [room, data.playerID, data.position]);
  let { cards } = data;
  if (top) {
    cards = [...cards].reverse();
  }
  return (
    <LaneContainer top={top} index={index}>
      {cards.map((card, cardIndex) => (
        <LaneCard
          key={cardIndex}
          card={card}
          top={top}
          playing={playing}
          playerID={data.playerID}
          lane={index}
        />
      ))}
    </LaneContainer>
  );
}

BattleLane.propTypes = {
  index: PropTypes.number,
  lane: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
};
