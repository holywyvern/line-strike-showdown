import { useState } from "react";
import Drawer from "react-modern-drawer";

import { DrawerButton } from "../design/DrawerButton";

import { Chat } from "./Chat";

export function ChatDrawer() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((open) => !open);
  return (
    <>
      <DrawerButton onClick={toggleDrawer} />
      <Drawer
        open={open}
        onClose={toggleDrawer}
        direction="right"
        size={350}
        style={{ display: "flex" }}
      >
        <Chat />
      </Drawer>
    </>
  );
}
