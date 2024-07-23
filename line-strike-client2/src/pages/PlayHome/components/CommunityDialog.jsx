import { Button } from "../../../design/Button";
import { Dialog } from "../../../design/Dialog";
import { Separator } from "../../../design/Separator";

import { BattleFinder } from "./BattleFinder";
import { PlayerFinder } from "./PlayerFinder";

export function CommunityDialog() {
  return (
    <Dialog grow>
      <Dialog.Header>
        <h3>Community</h3>
      </Dialog.Header>
      <Dialog.Body center>
        <BattleFinder />
        <PlayerFinder />
        <Separator />
        <Button disabled>Forums</Button>
        <Button disabled>Discord</Button>
      </Dialog.Body>
    </Dialog>
  );
}
