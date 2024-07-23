import { CommunityDialog } from "./components/CommunityDialog";
import { MatchmakeDialog } from "./components/MatchmakeWindow";
import { StategyDialog } from "./components/StategyDialog";
import { Layout } from "./design/Layout";

export function PlayHome() {
  return (
    <Layout>
      <MatchmakeDialog />
      <StategyDialog />
      <CommunityDialog />
    </Layout>
  );
}
