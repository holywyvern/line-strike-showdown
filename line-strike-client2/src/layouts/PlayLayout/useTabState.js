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
  const [notifications, setNotifications] = useState(() => new Set());
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const activeTab = findActiveTab(tabs, location.pathname);

  useEffect(() => {
    if (!activeTab) return;

    if (activeTab.music) {
      AudioManager.playBgm({ name: activeTab.music, volume: 100 });
    } else {
      AudioManager.stopBgm();
    }
  }, [activeTab, location.pathname]);
  useEffect(() => {
    if (!activeTab) return;
    
    const { id } = activeTab;
    setNotifications((notifications) => {
      if (!notifications.has(id)) return notifications;

      const newNotifications = new Set(notifications);
      newNotifications.delete(id);
      return newNotifications;
    });
  }, [notifications, activeTab]);
  return {
    tabs,
    activeTab,
    notifications,
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
    notify(id) {
      setNotifications((notifications) => {
        if (notifications.has(id)) return notifications;

        return new Set([...notifications, id]);
      });
    },
  };
}
