import { useState } from "react";
import PropTypes from "prop-types";

import { Box } from "../../design/Box";
import { Button } from "../../design/Button";
import { Column } from "../../design/Column";
import { List } from "../../design/List";
import { Row } from "../../design/Row";
import { Modal } from "../../design/Modal";
import { Select } from "../../design/Select";
import { TextInput } from "../../design/TextInput";
import { Grid } from "../../design/Grid";

import { useLobby } from "../../hooks/useLobby";
import { useProfile } from "../../hooks/useProfile";
import { useCards } from "../../hooks/useCards";

function OnlinePlayer({ id, player, isYou, challengePlayer }) {
  const profile = useProfile();
  const { formats } = useCards();
  const [visible, setVisible] = useState(false);
  const [formatID, setFormatID] = useState(profile.formatID);
  const [message, setMessage] = useState("");
  return (
    <>
      <List.Item>
        <Box light>
          <Row spaceItems>
            <Column>
              <h3 style={{ margin: 0, fontSize: "1em" }}>{player.name}</h3>
              <span>(Unknown Status)</span>
            </Column>
            <Column>
              <div>(No Ranking)</div>
              <Row>
                <Button disabled>View Profile</Button>
                <Button disabled={isYou} onClick={() => setVisible(true)}>
                  Challenge!
                </Button>
              </Row>
            </Column>
          </Row>
        </Box>
      </List.Item>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            challengePlayer(id, formatID, message);
            setFormatID(profile.formatID);
            setMessage("");
            setVisible(false);
          }}
        >
          <fieldset>
            <legend>Challenge {player.name}</legend>
            <Grid columns={2} columnFormat="auto 1fr">
              <label htmlFor="format">Format</label>
              <Select
                name="format"
                value={formatID}
                onChange={(e) => setFormatID(Number(e.target.value))}
              >
                {formats.filter(Boolean).map((format) => (
                  <Select.Option key={format.id} value={format.id}>
                    {format.name}
                  </Select.Option>
                ))}
              </Select>
              <label htmlFor="message">Message</label>
              <TextInput
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </fieldset>
          <Row>
            <Button type="submit">Challenge!</Button>
          </Row>
        </form>
      </Modal>
    </>
  );
}

OnlinePlayer.propTypes = {
  id: PropTypes.string,
  player: PropTypes.any,
  isYou: PropTypes.bool,
  challengePlayer: PropTypes.func,
};

export function OnlinePlayers() {
  const { players, id, room } = useLobby();
  const challengePlayer = (clientId, formatID, message) => {
    room.send("challenge", { clientId, formatID, message });
  };
  return (
    <Box flex stretch>
      <Box.Header>
        <h2>
          People Online (<strong>{Object.keys(players).length}</strong>)
        </h2>
      </Box.Header>
      <Box.Body>
        <List>
          {Object.entries(players).map(([key, player]) => {
            const isYou = id === key;
            return (
              <OnlinePlayer
                key={key}
                id={key}
                player={player}
                isYou={isYou}
                challengePlayer={challengePlayer}
              />
            );
          })}
        </List>
      </Box.Body>
    </Box>
  );
}
