import { Logo } from "../../../../design/Logo";

import { PlayTabs } from "../../components/PlayTabs";
import { Settings } from "../../components/Settings";

import styles from "./styles.module.scss";

export function PlayNav() {
  return (
    <nav className={styles.nav}>
      <Logo small />
      <PlayTabs />
      <Settings />
    </nav>
  );
}
