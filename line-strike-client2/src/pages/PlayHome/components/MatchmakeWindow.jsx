import { useLink } from "../../../contexts/LinkContext";
import { useMatchmake } from "../../../contexts/MatchmakeContext";
import { Button } from "../../../design/Button";
import { Dialog } from "../../../design/Dialog";
import { Separator } from "../../../design/Separator";
import { MatchmakerColumns } from "../design/MatchmakerColumns";

import { FormatSelector } from "./FormatSelector";

export function MatchmakeDialog() {
  const { account } = useLink();
  const match = useMatchmake();
  return (
    <Dialog grow>
      <Dialog.Header>
        <h3>Quick Match</h3>
      </Dialog.Header>
      <Dialog.Body center>
        <FormatSelector />
        <Separator />
        <MatchmakerColumns start={match.start} type={match.type} />
        <Separator />
        <Button disabled={!account || match.matching} onClick={match.ranked}>Ranked Battle</Button>
        <Button disabled={match.matching} onClick={match.unranked}>
          Unranked Battle
        </Button>
        <Button disabled={!match.matching} onClick={match.cancel}>
          Cancel Matchmaking
        </Button>
      </Dialog.Body>
    </Dialog>
  );
}
