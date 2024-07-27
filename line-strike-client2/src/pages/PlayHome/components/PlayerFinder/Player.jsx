import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { List } from "../../../../design/List";
import { Row } from "../../../../design/Row";
import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { Dialog } from "../../../../design/Dialog";
import { TextInput } from "../../../../design/TextInput";
import { Label } from "../../../../design/Label";

import { useLobby } from "../../../../contexts/LobbyContext";
import { useDatabase } from "../../../../contexts/DatabaseContext";

import { FormatPicker } from "../../../../components/FormatPicker";

export function Player({ player }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { standardFormatID } = useDatabase();
  const [formatID, setFormatID] = useState(standardFormatID);
  const [message, setMessage] = useState("");
  const lobby = useLobby();
  const { sessionID, name, accountID } = player;
  const onChallenge = (e) => {
    e.preventDefault();
    const { sessionID } = player;
    lobby.send("challenge", { clientId: sessionID, formatID, message });
    setOpen(false);
  };
  const onClose = () => setOpen(false);
  return (
    <>
      <List.Item>
        <Row flex spaceItems centerVertically>
          {name}
          <Row>
            <Button
              type="button"
              disabled={!accountID}
              onClick={() => navigate(`/play/accounts/${accountID}`)}
            >
              Profile
            </Button>
            <Button
              disabled={!sessionID || sessionID === lobby.sessionId}
              onClick={() => setOpen(true)}
            >
              Challenge
            </Button>
          </Row>
        </Row>
      </List.Item>
      <Modal open={open} onClose={onClose}>
        <Dialog>
          <Dialog.Header>
            <h3>Challenge {player.name}</h3>
            <Modal.Close onClick={onClose} />
          </Dialog.Header>
          <Dialog.Body>
            <form onSubmit={onChallenge}>
              <Label htmlFor="format">Format:</Label>
              <FormatPicker
                name="format"
                value={formatID}
                onChange={(e) => setFormatID(e.target.valueAsNumber)}
              />
              <Label htmlFor="message">Message:</Label>
              <TextInput
                name="message"
                placeholder="Want to play a match of Line Strike?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit">
                Challenge {player.name}
              </Button>
            </form>
          </Dialog.Body>
        </Dialog>
      </Modal>
    </>
  );
}

Player.propTypes = {
  player: PropTypes.any,
};
