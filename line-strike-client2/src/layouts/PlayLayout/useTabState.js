import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DEFAULT_TABS } from "../../contexts/TabContext";

export function useTabState() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  return {
    tabs,
    ensure(tab) {
      setTabs((tabs) => {
        if (tabs.find((i) => i.id === tab.id)) return tabs;

        const newTabs = [...tabs];
        newTabs.push(tab);
        return newTabs;
      });
    },
    close(id) {
      setTabs((tabs) => {
        const index = tabs.findIndex((i) => i.id === id);
        if (index < 0) return tabs;

        const newTabs = [...tabs];
        const tab = tabs[index];
        newTabs.splice(index, 1);
        if (location.pathname === tab.href) {
          navigate(newTabs[index - 1].href);
        }
        return newTabs;
      });
    },
  };
}
