import PropTypes from "prop-types";

import { useBattleRoom, useBoard, usePlayers } from "../context";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { calculatePpCost } from "../utils/calculatePpCost";
import { canPlaceCard } from "../utils/canPlaceCard";

import { CardPlacingInfo } from "../design/CardPlacingInfo";

import { Button } from "../../../../design/Button";


export function CardPlacer({ status, lane, hidePlacer }) {
  const room = useBattleRoom();
  const { cards, skills } = useDatabase();
  const { top, bottom, playing } = usePlayers();
  const { lanes: topLanes } = useBoard(top, true, false);
  const { lanes: bottomLanes, usedHand } = useBoard(bottom, false, playing);
  if (!playing) return null;

  const position = status.position * 3 + lane;
  const lanes = [bottomLanes, topLanes];
  return (
    <>
      {bottom.handIDs.map((id, index) => {
        if (usedHand.includes(index)) return null;

        const pp = calculatePpCost(id, status, skills, cards, lanes, position);
        const card = cards[id];
        const canPlace = canPlaceCard(id, status, skills, cards, bottom, pp);
        const onPlacing = () => {
          room.send("play", { handIndex: index, position });
          hidePlacer();
        };
        return (
          <Button key={index} disabled={!canPlace} onClick={onPlacing}>
            <CardPlacingInfo card={card} pp={pp} canPlace={canPlace} />
          </Button>
        );
      })}
    </>
  );
}

CardPlacer.propTypes = {
  status: PropTypes.any,
  lane: PropTypes.number,
  hidePlacer: PropTypes.func,
};
