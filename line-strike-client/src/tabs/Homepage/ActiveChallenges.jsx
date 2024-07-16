import { Box } from "../../design/Box";
import { Button } from "../../design/Button";
import { Column } from "../../design/Column";
import { List } from "../../design/List";
import { Row } from "../../design/Row";

import { useCards } from "../../hooks/useCards";
import { useLobby } from "../../hooks/useLobby";

export function ActiveChallenges() {
  const { challenges, room } = useLobby();
  const { formats } = useCards();
  return (
    <Box flex stretch>
      <Box.Header>
        <h2>Challenged By</h2>
      </Box.Header>
      <Box.Body>
        <List>
          {Object.entries(challenges).map(
            ([id, { name, message, formatID }]) => {
              const onAccept = () => {
                room.send("accept", id);
              };
              const onReject = () => {
                room.send("reject", id);
              };
              return (
                <List.Item key={id}>
                  <Box light>
                    <Column>
                      <Row spaceItems>
                        <h3 style={{ fontSize: "1em", margin: 0 }}>{name}</h3>
                        <span>{formats[formatID].name}</span>
                      </Row>
                      <p style={{ margin: 0 }}>{message}</p>
                      <Row end>
                        <Button onClick={onReject}>Reject</Button>
                        <Button onClick={onAccept}>Accept</Button>
                      </Row>
                    </Column>
                  </Box>
                </List.Item>
              );
            }
          )}
        </List>
      </Box.Body>
    </Box>
  );
}
