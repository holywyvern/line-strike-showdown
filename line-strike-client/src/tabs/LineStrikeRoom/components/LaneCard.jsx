import PropTypes from "prop-types";

import { useCards } from "../../../hooks/useCards";

import { useBattleRoomState, useSchema } from "../context";

import { LaneCardContainer } from "../design/LaneCardContainer";
import { MiniCard } from "../design/MiniCard";
import { useState } from "react";
import { Modal } from "../../../design/Modal";
import { Column } from "../../../design/Column";
import { CardPlacer } from "./CardPlacer";
import { useHoveredCard } from "../context/HoveredCardContext";

export function LaneCard({ card, top, playing, lane }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const [open, setOpen] = useState(false);
  const { phase } = useBattleRoomState();
  const { cards } = useCards();
  const { cardID, incapacitated, stunned, attack, baseBuster, baseGuard } =
    useSchema(card);
  const data = cards[cardID] || {};
  const processedCard = {
    ...data,
    attack,
    baseBuster,
    baseGuard,
    incapacitated,
    stunned,
    normalAttack: data.attack,
  };
  const onPlaceCard = () => {
    setOpen(true);
  };
  const onHover = () => {
    if (data) setHoveredCard(data);
  };
  return (
    <>
      <LaneCardContainer
        top={top}
        disabled={!playing || phase !== "planning"}
        onClick={onPlaceCard}
      >
        {cardID > 0 && <MiniCard card={processedCard} played onHover={onHover} />}
      </LaneCardContainer>
      {playing && (
        <Modal open={open} title="Place Card" onClose={() => setOpen(false)}>
          <Column>
            <CardPlacer
              status={card}
              lane={lane}
              hidePlacer={() => setOpen(false)}
            />
          </Column>
        </Modal>
      )}
    </>
  );
}

LaneCard.propTypes = {
  card: PropTypes.any,
  top: PropTypes.bool,
  playing: PropTypes.bool,
  lane: PropTypes.number,
};
