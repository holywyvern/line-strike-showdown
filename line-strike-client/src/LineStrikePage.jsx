import { AppNavbar } from "./components/AppNavbar";
import { AppTabs } from "./components/AppTabs";
import { AppView } from "./components/AppView";
import { MainPageLayout } from "./design/MainPageLayout";

export function LineStrikePage() {
  return (
    <MainPageLayout>
      <AppNavbar />
      <AppTabs />
      <AppView />
    </MainPageLayout>
  );
}
