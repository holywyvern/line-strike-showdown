import { Button } from "../../../design/Button";
import { Dialog } from "../../../design/Dialog";
import { Separator } from "../../../design/Separator";

export function CommunityDialog() {
  return <Dialog grow>
    <Dialog.Header><h3>Community</h3></Dialog.Header>
    <Dialog.Body center>
      <Button>Watch a Battle</Button>
      <Button>Find a Player</Button>
      <Separator />
      <Button disabled>Forums</Button>
      <Button disabled>Discord</Button>
    </Dialog.Body>
  </Dialog>
}