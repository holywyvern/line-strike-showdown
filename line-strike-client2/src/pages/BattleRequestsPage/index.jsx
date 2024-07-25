import { useLobby } from "../../contexts/LobbyContext";

import { useMapSchema } from "../BattlePage/LineStrikeRoom/context";

import { useDatabase } from "../../contexts/DatabaseContext";

import { Dialog } from "../../design/Dialog";
import { List } from "../../design/List";
import { Box } from "../../design/Box";
import { Column } from "../../design/Column";
import { Row } from "../../design/Row";
import { Button } from "../../design/Button";
import { Layout } from "../PlayHome/design/Layout";

function usePlayer() {
  const lobby = useLobby();
  const players = useMapSchema(lobby?.state?.players);
  const player = players[lobby?.sessionId];
  return player;
}

function useRequests() {
  const player = usePlayer();
  console.log(player);
  const battles = useMapSchema(player?.challenges);
  return { battles };
}

export function BattleRequestsPage() {
  const { formats } = useDatabase();
  const room = useLobby();
  const { battles } = useRequests();
  const entries = Object.entries(battles);
  return (
    <Layout>
      <Dialog>
        <Dialog.Header>
          <h3>Challenges</h3>
        </Dialog.Header>
        <Dialog.Body>
          <List>
            {entries.map(
              ([id, { name, message, formatID }]) => {
                const onAccept = () => {
                  room.send("accept", id);
                };
                const onReject = () => {
                  room.send("reject", id);
                };
                return (
                  <List.Item key={id}>
                    <Box flex>
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
        </Dialog.Body>
      </Dialog>
    </Layout>
  );
}
