import { useEffect, useState } from "react";

import { Modal } from "../../../design/Modal";
import { Card } from "../../../design/Card";
import { Button } from "../../../design/Button";
import { Row } from "../../../design/Row";

import { useRoom } from "../context";

import { useCards } from "../../../hooks/useCards";
import { Column } from "../../../design/Column";

export function FirstDrawPhase() {
  const db = useCards();
  const [hand, setHand] = useState([]);
  const room = useRoom();
  const [selected, setSelected] = useState(false);
  const id = room?.sessionId;
  const me =
    room.state.playerA.sessionID === id
      ? room.state.playerA
      : room.state.playerB;
  const format = db.formats[room.state.formatID];
  useEffect(() => {
    if (!me) return;

    setHand([...(me.handIDs || [])]);
    me.handIDs?.onChange(() => {
      setHand([...me.handIDs]);
    });
  }, [me]);
  const cards = hand
    .map((i) => db.cards[i]);
  return (
    <Modal open title="STARTING HAND">
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
          {cards.map((card, index) => (
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
