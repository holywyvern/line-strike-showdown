import { useState } from "react";

import { DEFAULT_TABS } from "../../contexts/TabContext";

export function useTabState() {
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  return { tabs };
}
