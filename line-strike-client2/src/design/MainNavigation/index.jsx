import { useNavigate, useLocation } from "react-router-dom";

import useIsMobile from "useismobile";

import styles from "./styles.module.scss";

import { Button } from "../../design/Button";

import { Logo } from "../Logo";

export function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <Button.Group>
          <Button
            disabled={location.pathname === "/"}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          {!isMobile && (
            <Button
              disabled={location.pathname === "/cards"}
              onClick={() => navigate("/cards")}
            >
              Card List
            </Button>
          )}
          <Button
            onClick={() =>
              window.open("https://pso2ngs.wiki/wiki/Line_Strike", "_blank")
            }
          >
            Learn
          </Button>
          {!isMobile && (
            <>
              <Button
                onClick={() =>
                  window.open(
                    "https://github.com/holywyvern/line-strike-showdown",
                    "_blank"
                  )
                }
              >
                Source Code
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://github.com/holywyvern/line-strike-showdown/issues",
                    "_blank"
                  )
                }
              >
                Issue Tracker
              </Button>
            </>
          )}
        </Button.Group>
        {!isMobile && (
          <Button.Group>
            <Button onClick={() => navigate("/play")}>Play</Button>
          </Button.Group>
        )}
      </nav>
    </div>
  );
}
