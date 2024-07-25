import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { LaneContainer } from "../design/LaneContainer";

import { useBattleRoom, useSchema } from "../context";

import { LaneCard } from "./LaneCard";
import { Animation } from "../design/Animation";

export function BattleLane({ index, lane, top, playing }) {
  const room = useBattleRoom();
  const data = useSchema(lane);
  const [attack, setAttack] = useState(null);
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const clear = room.onMessage("attack", ({ playerID, index, blocked }) => {
      if (playerID !== data.playerID) return;
      if (data.position !== index) return;

      setAttack(`attack-${top ? "top" : "bottom"}`);
      setTimeout(() => {
        setAttack(null);
      }, 800);
      if (blocked) {
        setTimeout(() => {
          setBlock(`block-${top ? "top" : "bottom"}`);
        }, 250);
        setTimeout(() => {
          setBlock(null);
        }, 600);
      }
    });
    return () => {
      clear?.();
    };
  }, [room, data.playerID, data.position, top]);
  let { cards } = data;
  if (top) {
    cards = [...cards].reverse();
  }
  return (
    <>
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
      <LaneContainer top={top} index={index} animation>
        {attack && <Animation name={attack} />}
      </LaneContainer>
      <LaneContainer top={top} index={index} animation>
        {block && <Animation name={block} />}
      </LaneContainer>
    </>
  );
}

BattleLane.propTypes = {
  index: PropTypes.number,
  lane: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
};
