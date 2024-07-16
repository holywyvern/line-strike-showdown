import { Box } from "../../design/Box";
import { Button } from "../../design/Button";

import { List } from "../../design/List";
import { Row } from "../../design/Row";
import { useLobby } from "../../hooks/useLobby";
import { useBattleRooms } from "../../services/colyseus";

const ROOM_TYPE = {};

export function ActiveMatches() {
  const rooms = useBattleRooms();
  const { id, room : lobby } = useLobby();
  return (
    <Box flex stretch>
      <Box.Header>
        <h2>Active Matches</h2>
      </Box.Header>
      <Box.Body>
        <List>
          {rooms.map((room) => {
            const isInRoom = room.metadata.players.includes(id);
            const onWatch = () => {
              lobby.send("spectate", room.roomId)
            }
            return (
              <List.Item key={room.roomId}>
                <Box light>
                  <Row spaceItems>
                    <span>
                      <strong>{room.metadata.challenger.name}</strong>
                      &nbsp;
                      <span>VS</span>
                      &nbsp;
                      <strong>{room.metadata.challenged.name}</strong>
                      &nbsp; &nbsp;
                      <i>({ROOM_TYPE[room.metadata.type] || "Free Battle"})</i>
                    </span>
                    <Button disabled={isInRoom} onClick={onWatch}>Watch</Button>
                  </Row>
                </Box>
              </List.Item>
            );
          })}
        </List>
      </Box.Body>
    </Box>
  );
}
