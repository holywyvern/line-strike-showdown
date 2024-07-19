import { cloneElement } from "react";
import { ModalContext } from "../contexts/ModalContext";

import { TabView } from "../design/TabView";

import { useTabs } from "../hooks/useTabs";

export function AppView() {
  const { tabs, active } = useTabs();
  return (
    <ModalContext.Wrapper>
      {tabs.map((tab, index) => {
        const visible = index === active;
        return (
          <ModalContext key={tab.id} visible={visible}>
            <TabView hidden={!visible}>
              {cloneElement(tab.element, { tabIndex: index })}
            </TabView>
          </ModalContext>
        );
      })}
    </ModalContext.Wrapper>
  );
}
