import { HomepageLayout } from "../../design/HomepageLayout";
import { Column } from "../../design/Column";

import { ActiveChallenges } from "./ActiveChallenges";
import { ActiveMatches } from "./ActiveMatches";
import { DeckSelector } from "./DeckSelector";
import { OnlinePlayers } from "./OnlinePlayers";
import { MatchFinder } from "./MatchFinder";
import { FormatSelector } from "./FormatSelector";
import { Disclaimers } from "../../components/Disclaimers";

export function Homepage() {
  return (
    <HomepageLayout>
      <Column>
        <FormatSelector />
        <MatchFinder />
        <DeckSelector />
      </Column>
      <Column>
        <Disclaimers />
        <ActiveChallenges />
      </Column>
      <Column stretch>
        <OnlinePlayers />
        <ActiveMatches />
      </Column>
    </HomepageLayout>
  );
}
