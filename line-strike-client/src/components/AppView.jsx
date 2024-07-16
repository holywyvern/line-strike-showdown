import { TabView } from "../design/TabView";
import { useTabs } from "../hooks/useTabs";

export function AppView() {
  const { tabs, active } = useTabs();
  return (
    <>
      {tabs.map((tab, index) => (
        <TabView key={tab.id} hidden={index !== active}>
          {tab.element}
        </TabView>
      ))}
    </>
  );
}
