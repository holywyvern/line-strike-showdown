import { Button } from "../../../design/Button";
import { Dialog } from "../../../design/Dialog";

export function StategyDialog() {
  return (
    <Dialog grow>
      <Dialog.Header>
        <h3>Strategy</h3>
      </Dialog.Header>
      <Dialog.Body center>
        <Button>Deck Builder</Button>
        <Button disabled>Learn</Button>
      </Dialog.Body>
    </Dialog>
  );
}
