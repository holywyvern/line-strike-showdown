import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DEFAULT_TABS } from "../../contexts/TabContext";
import { AudioManager } from "../../utils/AudioManager";

function pathMatches(path, tab) {
  if (tab.match) {
    return tab.match.test(path);
  }
  return tab.href === path;
}

function findActiveTab(tabs, path) {
  return tabs.find((tab) => pathMatches(path, tab));
}

export function useTabState() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const activeTab = findActiveTab(tabs, location.pathname);
  useEffect(() => {
    if (!activeTab) return;

    if (activeTab.music) {
      AudioManager.playBgm({ name: activeTab.music, volume: 100 });
    } else {
      console.log("Stopping music");
      AudioManager.stopBgm();
    }
  }, [activeTab, location.pathname]);
  return {
    tabs,
    activeTab,
    ensure(tab) {
      setTabs((tabs) => {
        const index = tabs.findIndex((i) => i.id === tab.id);
        if (tabs[index] === tab) return tabs;

        const newTabs = [...tabs];
        if (index < 0) {
          newTabs.push(tab);
        } else {
          newTabs[index] = tab;
        }
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
    changeMusic(id, music) {
      setTabs((tabs) => {
        const index = tabs.findIndex((i) => i.id === id);
        if (index < 0) return tabs;

        const tab = tabs[index];
        if (tab.music === music) return tabs;

        const newTabs = [...tabs];
        newTabs[index] = { ...tab, music };
        return newTabs;
      });
    },
    removeWarning() {},
  };
}
