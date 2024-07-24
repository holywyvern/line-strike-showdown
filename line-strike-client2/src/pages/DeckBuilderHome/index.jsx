import { Dialog } from "../../design/Dialog";
import { useProfile } from "../../contexts/ProfileContext";
import { useDeckBuilderFormat } from "../../layouts/DeckBuilderLayout/context";
import { Button } from "../../design/Button";
import { Row } from "../../design/Row";
import { useNavigate } from "react-router-dom";

export function DeckBuilderHome() {
  const { decks } = useProfile();
  const format = useDeckBuilderFormat();
  const navigate = useNavigate();
  const formatDecks = decks[format.id];
  return (
    <Dialog>
      <Dialog.Header>
        <h2>{format.name}&apos;s Decks</h2>
      </Dialog.Header>
      <Dialog.Body>
        {formatDecks.map((deck, index) => {
          const path = `/play/decks/${format.slug}/${index}`;
          return (
            <Row key={index} centerChildren stetchSelf centerVertically>
              <Row flex>{deck.name}</Row>
              <Button onClick={() => navigate(path)}>Edit</Button>
            </Row>
          );
        })}
      </Dialog.Body>
    </Dialog>
  );
}
