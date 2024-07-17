import { AppNavbar } from "./components/AppNavbar";
import { AppView } from "./components/AppView";
import { MainPageLayout } from "./design/MainPageLayout";

export function LineStrikePage() {
  return (
    <MainPageLayout>
      <AppNavbar />
      <AppView />
    </MainPageLayout>
  );
}
