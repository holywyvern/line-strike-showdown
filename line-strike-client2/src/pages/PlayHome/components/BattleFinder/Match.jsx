import PropTypes from "prop-types";

import { useLobby } from "../../../../contexts/LobbyContext";

import { Button } from "../../../../design/Button";
import { List } from "../../../../design/List";
import { Box } from "../../../../design/Box";
import { Row } from "../../../../design/Row";

const ROOM_TYPE = {};

export function Match({ battle }) {
  const { roomId, metadata } = battle;
  const lobby = useLobby();
  const isInRoom = metadata.players.includes(lobby.sessionId);
  const onWatch = () => {
    lobby.send("spectate", roomId);
  };
  return (
    <List.Item>
      <Box flex>
        <Row spaceItems centerChildren>
          <span style={{ display: "flex", alignItems: "center" }}>
            <strong>{metadata.challenger.name}</strong>
            &nbsp;
            <span>VS</span>
            &nbsp;
            <strong>{metadata.challenged.name}</strong>
            &nbsp; &nbsp;
            <i>({ROOM_TYPE[metadata.type] || "Free Battle"})</i>
          </span>
          <Button disabled={isInRoom} onClick={onWatch}>
            Watch
          </Button>
        </Row>
      </Box>
    </List.Item>
  );
}

Match.propTypes = {
  battle: PropTypes.any,
};
