import PropTypes from "prop-types";

import { useBattleRoom, useBoard, usePlayers } from "../context";

import { calculatePpCost } from "../utils/calculatePpCost";
import { useCards } from "../../../hooks/useCards";
import { canPlaceCard } from "../utils/canPlaceCard";
import { Button } from "../../../design/Button";
import { CardPlacingInfo } from "../design/CardPlacingInfo";

export function CardPlacer({ status, lane, hidePlacer }) {
  const room = useBattleRoom();
  const { cards, skills } = useCards();
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
