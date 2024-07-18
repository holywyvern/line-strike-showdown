import { useState } from "react";
import { Tabs } from "../../design/Tabs";
import { useTabs } from "../../hooks/useTabs";
import { Modal } from "../../design/Modal";
import { Column } from "../../design/Column";
import { Row } from "../../design/Row";
import { Button } from "../../design/Button";

export function AppTabs() {
  const [{ open, message, onClose }, setWarning] = useState(() => ({
    message: null,
    open: false,
  }));
  const { tabs, active, changeTab, removeTab } = useTabs();
  const onCancel = () => setWarning({ open: false, message: null });
  return (
    <>
      <Tabs main>
        {tabs.map(({ id, name, closable, warning }, index) => {
          const onTabClose = () => removeTab(index);
          let onClose = onTabClose;
          if (warning) {
            onClose = () =>
              setWarning({ message: warning, onClose: onTabClose, open: true });
          }
          return (
            <Tabs.Tab
              key={id}
              active={index === active}
              onClick={() => changeTab(index)}
              onClose={closable ? onClose : undefined}
            >
              {name}
            </Tabs.Tab>
          );
        })}
      </Tabs>
      <Modal open={open} onClose={onCancel}>
        <Column>
          {message}
          <Row centerChildren center>
            <Button
              onClick={() => {
                onCancel();
                onClose();
              }}
            >
              Close tab
            </Button>
            <Button onClick={onCancel}>Keep tab open</Button>
          </Row>
        </Column>
      </Modal>
    </>
  );
}
