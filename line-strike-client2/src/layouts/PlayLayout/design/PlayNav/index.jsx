import { Logo } from "../../../../design/Logo";

import { MobileMenu } from "../../components/MobileMenu";
import { DesktopMenu } from "../../components/DesktopMenu";

import useIsMobile from "useismobile";

import styles from "./styles.module.scss";

export function PlayNav() {
  const isMobile = useIsMobile();
  return (
    <nav className={styles.nav}>
      <Logo small />
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </nav>
  );
}
