import { Tabs } from "../../design/Tabs";
import { useTabs } from "../../hooks/useTabs";

export function AppTabs() {
  const { tabs, active, changeTab, removeTab } = useTabs();
  return (
    <Tabs main>
      {tabs.map(({ id, name, closable }, index) => (
        <Tabs.Tab
          key={id}
          active={index === active}
          onClick={() => changeTab(index)}
          onClose={closable ? () => removeTab(index) : undefined}
        >
          {name}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}
