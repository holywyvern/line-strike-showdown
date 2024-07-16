import { HomepageLayout } from "../../design/HomepageLayout";
import { Column } from "../../design/Column";

import { ActiveChallenges } from "./ActiveChallenges";
import { ActiveMatches } from "./ActiveMatches";
import { DeckSelector } from "./DeckSelector";
import { OnlinePlayers } from "./OnlinePlayers";
import { MatchFinder } from "./MatchFinder";
import { FormatSelector } from "./FormatSelector";

export function Homepage() {
  return (
    <HomepageLayout>
      <Column>
        <FormatSelector />
        <MatchFinder />
        <DeckSelector />
      </Column>
      <ActiveChallenges />
      <Column stretch>
        <OnlinePlayers />
        <ActiveMatches />
      </Column>
    </HomepageLayout>
  );
}
