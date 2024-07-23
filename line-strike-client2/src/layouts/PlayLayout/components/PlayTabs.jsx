import { useLocation, useNavigate } from "react-router-dom";

import { useTabs } from "../../../contexts/TabContext";

import { TabContainer } from "../design/TabContainer";

export function PlayTabs() {
  const navigate = useNavigate();
  const { tabs } = useTabs();
  const location = useLocation();
  return (
    <TabContainer>
      {tabs.map((tab) => {
        const onClose = tab.closable ? () => {} : undefined;
        const onClick = () => {
          navigate(tab.href);
        };
        return (
          <TabContainer.Tab
            key={tab.id}
            name={tab.name}
            icon={tab.icon}
            active={location.pathname === tab.href}
            onClose={onClose}
            onClick={onClick}
          />
        );
      })}
    </TabContainer>
  );
}
