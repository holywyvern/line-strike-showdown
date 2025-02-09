import { useState } from "react";
import useIsMobile from "useismobile";

import {
  useArraySchema,
  useBattleRoom,
  useBattleRoomState,
  usePlayers,
} from "../context";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { Modal } from "../../../../design/Modal";
import { Dialog } from "../../../../design/Dialog";
import { Column } from "../../../../design/Column";
import { Row } from "../../../../design/Row";
import { Button } from "../../../../design/Button";

import { Card } from "../../../CollectionPage/design/Card";

export function HandSelector() {
  const room = useBattleRoom();
  const { bottom } = usePlayers();
  const { formats, cards } = useDatabase();
  const { formatID } = useBattleRoomState();

  const handIDs = useArraySchema(bottom?.handIDs);
  const hand = handIDs.map((i) => cards[i]);

  const [selected, setSelected] = useState(false);
  const format = formats[formatID];
  const isMobile = useIsMobile(1024);

  return (
    <Modal open title="FIRST HAND" fake>
      <Dialog>
        <Dialog.Header>
          <h3>FIRST HAND</h3>
        </Dialog.Header>
        <Dialog.Body>
          <Column>
            {!isMobile && (
              <Row center>
                <p style={{ margin: 0, padding: 0 }}>
                  This is your hand.
                  <br />
                  You can keep it or swap the cards once.
                  <br />
                  If you don&apos;t select anything within{" "}
                  {format.mulliganSeconds} seconds,
                  <br />
                  you will keep the hand.
                </p>
              </Row>
            )}
            <Row center>
              {hand.filter(Boolean).map((card, index) => (
                <div
                  key={index}
                  style={{ maxWidth: "185px", maxHeight: "266px", flex: 0 }}
                >
                  <Card card={card} scale={isMobile ? 0.25 : 0.5} />
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
        </Dialog.Body>
      </Dialog>
    </Modal>
  );
}
