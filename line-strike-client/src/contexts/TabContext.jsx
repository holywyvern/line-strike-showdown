import { useState } from "react";
import PropTypes from "prop-types";

import { Context } from "../hooks/useTabs";

import { Homepage } from "../tabs/Homepage";
import { Library } from "../tabs/Library";

const DEFAULT_TABS = [
  {
    id: "home",
    name: "Homepage",
    closable: false,
    element: <Homepage />,
  },
  {
    id: "collection",
    name: "Collection",
    closable: false,
    element: <Library />,
  },
];

export function TabContext({ children }) {
  const [active, setActive] = useState(0);
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const api = {
    tabs,
    active,
    currentTab: tabs[active],
    addTab(name, element, options = {}) {
      setTabs((tabs) => {
        if (options?.id) {
          const index = tabs.findIndex((i) => i.id === options.id);
          if (index >= 0) {
            setActive(index);
            return tabs;
          }
        }

        const newTabs = [...tabs];
        newTabs.push({
          ...options,
          id:
            options?.id ||
            `${name}-${Date.now()}-${tabs.length}-${Math.random()}`,
          name,
          element,
          closable: options?.closable || false,
          warning: options?.warning || null,
        });
        setActive(tabs.length);
        return newTabs;
      });
    },
    changeTab(index) {
      if (index < 0 || index >= tabs.length) return;

      setActive(index);
    },
    removeTab(index) {
      setTabs((tabs) => {
        if (index < 0 || index >= tabs.length) return tabs;

        const newTabs = [...tabs];
        const tab = newTabs[index];
        tab?.onClose?.();
        newTabs.splice(index, 1);
        if (active >= index) {
          setActive(active - 1);
        }
        return newTabs;
      });
    },
    removeWarning(index) {
      setTabs((tabs) => {
        const newTabs = [...tabs];
        if (newTabs[index]) {
          const newTab = { ...newTabs[index] };
          newTab.warning = null;
          newTabs[index] = newTab;
        }
        return newTabs;
      });
    },
  };
  return <Context.Provider value={api}>{children}</Context.Provider>;
}

TabContext.propTypes = {
  children: PropTypes.node,
};
