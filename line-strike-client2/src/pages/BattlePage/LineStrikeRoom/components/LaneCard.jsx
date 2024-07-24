import { useState } from "react";
import PropTypes from "prop-types";

import { useBattleRoomState, useSchema } from "../context";

import { LaneCardContainer } from "../design/LaneCardContainer";

import { Modal } from "../../../../design/Modal";
import { Dialog } from "../../../../design/Dialog";
import { Column } from "../../../../design/Column";
import { MiniCard } from "../../../../design/MiniCard";

import { useHoveredCard } from "../context/HoveredCardContext";

import { CardPlacer } from "./CardPlacer";
import { AnimationPlayer } from "./AnimationPlayer";

import { useDatabase } from "../../../../contexts/DatabaseContext";

export function LaneCard({ card, top, playing, lane, playerID }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const [open, setOpen] = useState(false);
  const { phase } = useBattleRoomState();
  const { cards } = useDatabase();
  const {
    realPosition,
    cardID,
    incapacitated,
    stunned,
    attack,
    baseBuster,
    baseGuard,
  } = useSchema(card);
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
        <LaneCardContainer.Card>
          {cardID > 0 && (
            <MiniCard card={processedCard} played onHover={onHover} />
          )}
        </LaneCardContainer.Card>
        <AnimationPlayer
          playerID={playerID}
          position={realPosition}
          top={top}
        />
      </LaneCardContainer>
      {playing && (
        <Modal open={open} title="Place Card" onClose={() => setOpen(false)}>
          <Dialog>
            <Dialog.Header>
              <h3>Place Card</h3>
              <Modal.Close onClose={() => setOpen(false)} />
            </Dialog.Header>
            <Dialog.Body>
              <Column>
                <CardPlacer
                  status={card}
                  lane={lane}
                  hidePlacer={() => setOpen(false)}
                />
              </Column>
            </Dialog.Body>
          </Dialog>
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
  playerID: PropTypes.any,
};
