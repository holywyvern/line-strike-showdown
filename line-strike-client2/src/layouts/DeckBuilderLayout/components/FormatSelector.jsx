import { useLocation, useNavigate } from "react-router-dom";

import { useDatabase } from "../../../contexts/DatabaseContext";

import { Button } from "../../../design/Button";

import { Sidenav } from "../design/Sidenav";

export function FormatSelector() {
  const { standardFormatID, formats } = useDatabase();
  const navigate = useNavigate();
  const location = useLocation();
  const standard = formats[standardFormatID];
  return (
    <Sidenav>
      <h3>Select a format</h3>
      <Button
        onClick={() => navigate("/play/decks")}
        disabled={location.pathname === "/play/decks"}
      >
        Standard ({standard.name})
      </Button>
      <h4>Other formats</h4>
      {formats.filter(Boolean).map((format) => {
        const path = `/play/decks/${format.slug}`;
        return (
          <Button
            key={format.id}
            disabled={location.pathname.startsWith(path)}
            onClick={() => navigate(path)}
          >
            {format.name}
          </Button>
        );
      })}
    </Sidenav>
  );
}
