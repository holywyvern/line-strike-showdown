import { Box } from "../../design/Box";
import { Button } from "../../design/Button";
import { Row } from "../../design/Row";
import { Select } from "../../design/Select";

import { useCards } from "../../hooks/useCards";
import { useProfile } from "../../hooks/useProfile";
import { useTabs } from "../../hooks/useTabs";
import { DeckEditor } from "../DeckEditor";

export function DeckSelector() {
  const { formats } = useCards();
  const { decks, formatID } = useProfile();
  const { addTab } = useTabs();
  const onSubmit = (e) => {
    e.preventDefault();
    const index = Number(e.target.deck.value);
    addTab(
      `Edit ${formats[formatID].name}'s Deck #${index + 1}`,
      <DeckEditor deck={decks[index]} index={index} formatID={formatID} />,
      {
        closable: true,
        id: `edit-deck-${index}`,
      }
    );
  };
  return (
    <Box>
      <Box.Header>
        <h2>My Decks</h2>
      </Box.Header>
      <Box.Body>
        <form onSubmit={onSubmit}>
          <Row>
            <Select flex name="deck">
              {decks.map((deck, index) => (
                <Select.Option value={index} key={index}>
                  {deck.name}
                </Select.Option>
              ))}
            </Select>
            <Button type="submit">Edit</Button>
          </Row>
        </form>
      </Box.Body>
    </Box>
  );
}
