import { useState } from "react";

import {
  useArraySchema,
  useBattleRoom,
  useBattleRoomState,
  usePlayers,
} from "../context";

import { useCards } from "../../../hooks/useCards";

import { Column } from "../../../design/Column";
import { Modal } from "../../../design/Modal";
import { Row } from "../../../design/Row";
import { Card } from "../../../design/Card";
import { Button } from "../../../design/Button";

export function HandSelector() {
  const room = useBattleRoom();
  const { bottom } = usePlayers();
  const { formats, cards } = useCards();
  const { formatID } = useBattleRoomState();

  const handIDs = useArraySchema(bottom?.handIDs);
  const hand = handIDs.map((i) => cards[i]);

  const [selected, setSelected] = useState(false);
  const format = formats[formatID];

  return (
    <Modal open title="FIRST HAND" fake>
      <Column>
        <Row center>
          <p style={{ margin: 0, padding: 0 }}>
            This is your hand.
            <br />
            You can keep it or swap the cards once.
            <br />
            If you don&apos;t select anything within {
              format.mulliganSeconds
            }{" "}
            seconds,
            <br />
            you will keep the hand.
          </p>
        </Row>
        <Row center>
          {hand.filter(Boolean).map((card, index) => (
            <div
              key={index}
              style={{ maxWidth: "185px", maxHeight: "266px", flex: 0 }}
            >
              <Card card={card} scale={0.5} />
            </div>
          ))}
        </Row>
        <form onSubmit={(e) => e.preventDefault()}>
          <Column>
            <Row center>
              <Button
                disabled={selected}
                onClick={() => {
                  room.send("keep");
                  setSelected(true);
                }}
              >
                Keep Cards
              </Button>
              <Button
                disabled={selected}
                onClick={() => {
                  room.send("mulligan");
                  setSelected(true);
                }}
              >
                Swap Cards
              </Button>
            </Row>
          </Column>
        </form>
      </Column>
    </Modal>
  );
}
