import { useState } from "react";
import PropTypes from "prop-types";

import {
  useHoveredCard,
  usePlayerBoard,
  usePlayerState,
  useRoom,
  useRoomState,
} from "./context";

import { useCards } from "../../hooks/useCards";

import { PlayedCard } from "../../design/PlayedCard";
import { Modal } from "../../design/Modal";
import { List } from "../../design/List";
import { Row } from "../../design/Row";
import { Button } from "../../design/Button";

function calculatePpCost(card, status, skills, cards, lanes, position) {
  let cost = card.ppCost;
  const oldCard = cards[status.cardID];
  if (oldCard) {
    cost -= oldCard.ppCost;
  }
  const skill = skills[card.skill.id];
  if (skill?.tags?.includes("reinforcement")) {
    const i = position % 3;
    const [a, b] = lanes;
    const laneA = a[i];
    const laneB = b[i];
    if (laneB.attack > laneA.attack) {
      cost -= 1;
    }
  }
  return Math.max(0, cost);
}

function canPlaceCard(card, status, skills, cards, player, pp) {
  if (status.justPlaced) return false;

  const ppLeft = player.pp - player.turn.usedPP;
  if (pp > ppLeft) return false;

  const oldCard = cards[status.cardID];
  if (!oldCard) return true;
  if (oldCard.ppCost >= card.ppCost) return false;
  if (card.element === oldCard.element) return true;

  const skill = skills[oldCard.skill.id];
  if (!skill) return false;

  return skill.tags.includes("wildcard");
}

function useLanes(player) {
  const { playerA, playerB } = useRoomState();

  const playerAisMe = player.sessionID === playerA.sessionID;
  const { lanes: a } = usePlayerBoard(playerA, !playerAisMe, playerAisMe);
  const { lanes: b } = usePlayerBoard(playerB, playerAisMe, !playerAisMe);
  if (playerAisMe) {
    return [a, b];
  }
  return [b, a];
}

function AvailableCards({ position, player, status, onClose }) {
  const room = useRoom();
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const { cards, skills } = useCards();
  const { handIDs } = usePlayerState(player);
  const { usedHand } = usePlayerState(player?.turn);
  const lanes = useLanes(player);

  const hand = (handIDs || []).map((i) => cards[i]).filter(Boolean);
  return (
    <List>
      {hand.map((card, index) => {
        if (usedHand.includes(index)) return null;

        const pp = calculatePpCost(
          card,
          status,
          skills,
          cards,
          lanes,
          position
        );
        const canPlace = canPlaceCard(card, status, skills, cards, player, pp);
        return (
          <List.Item key={index}>
            <div
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
              onMouseEnter={() => setHoveredCard(card)}
            >
              <Button
                flex
                disabled={!canPlace}
                onClick={() => {
                  room.send("play", { handIndex: index, position });
                  onClose?.();
                }}
              >
                <Row flex>
                  <img src={`elements/${card.element}.webp`} />
                  <span style={{ flex: 1, textAlign: "start" }}>
                    {card.name}
                  </span>
                  <span>- PP: {pp}</span>
                </Row>
              </Button>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
}

AvailableCards.propTypes = {
  player: PropTypes.any,
  status: PropTypes.any,
  position: PropTypes.number,
  onClose: PropTypes.func,
};

function PlayedCardState({ lanePosition, size, player, card, play, mirror }) {
  const { phase } = useRoomState();
  const status = usePlayerState(play);
  const [visible, setVisible] = useState(false);
  const { locked } = usePlayerState(player?.turn);
  const position = status.position * size + lanePosition;
  const onClose = () => setVisible(false);
  const canPlay = phase === "planning" && !locked;
  return (
    <>
      <PlayedCard
        status={status}
        card={card}
        mirror={mirror}
        onClick={
          player && canPlay
            ? () => {
                setVisible(true);
              }
            : undefined
        }
      />
      <Modal title="PLACE CARD" open={visible} onClose={onClose}>
        {player && (
          <AvailableCards
            player={player}
            status={status}
            position={position}
            onClose={onClose}
          />
        )}
      </Modal>
    </>
  );
}

PlayedCardState.propTypes = {
  player: PropTypes.any,
  card: PropTypes.any,
  play: PropTypes.any,
  mirror: PropTypes.bool,
  lanePosition: PropTypes.number,
  size: PropTypes.number,
};

function Lane({ player, lane, mirror }) {
  const db = useCards();
  let { cards, position } = usePlayerState(lane);
  if (mirror) {
    cards = [...(cards || [])].reverse();
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {cards.map((card, index) => (
        <PlayedCardState
          player={player}
          key={index}
          card={db.cards[card.cardID]}
          play={card}
          mirror={mirror}
          lanePosition={position}
          size={cards.length}
        />
      ))}
    </div>
  );
}

Lane.propTypes = {
  player: PropTypes.any,
  lane: PropTypes.any,
  mirror: PropTypes.bool,
  allowClick: PropTypes.bool,
};

export function LaneCards({ player, lanes, mirror }) {
  const { formats } = useCards();
  const { formatID } = useRoomState();
  const format = formats[formatID];
  if (!format) return null;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {lanes.map((lane, index) => (
        <Lane lane={lane} mirror={mirror} key={index} player={player} />
      ))}
    </div>
  );
}

LaneCards.propTypes = {
  player: PropTypes.any,
  lanes: PropTypes.any,
  mirror: PropTypes.bool,
};
