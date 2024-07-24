import { useLocation, useNavigate } from "react-router-dom";

import { useTabs } from "../../../contexts/TabContext";

import { TabContainer } from "../design/TabContainer";

export function PlayTabs() {
  const navigate = useNavigate();
  const { tabs, close } = useTabs();
  const location = useLocation();
  return (
    <TabContainer>
      {tabs.map((tab) => {
        const active = tab.match
          ? tab.match.test(location.pathname)
          : location.pathname === tab.href;
        const onClose = tab.closable ? () => close(tab.id) : undefined;
        const onClick = () => {
          navigate(tab.href);
        };
        return (
          <TabContainer.Tab
            key={tab.id}
            name={tab.name}
            icon={tab.icon}
            active={active}
            onClose={onClose}
            onClick={onClick}
          />
        );
      })}
    </TabContainer>
  );
}
