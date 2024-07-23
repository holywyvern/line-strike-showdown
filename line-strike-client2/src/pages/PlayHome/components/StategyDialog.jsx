import { useNavigate } from "react-router-dom";
import { Button } from "../../../design/Button";
import { Dialog } from "../../../design/Dialog";

export function StategyDialog() {
  const navigate = useNavigate();
  return (
    <Dialog grow>
      <Dialog.Header>
        <h3>Strategy</h3>
      </Dialog.Header>
      <Dialog.Body center>
        <Button onClick={() => navigate("/play/decks")}>Deck Builder</Button>
        <Button
          onClick={() =>
            window.open("https://pso2ngs.wiki/wiki/Line_Strike", "_blank")
          }
        >
          Learn
        </Button>
      </Dialog.Body>
    </Dialog>
  );
}
