import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { faChess } from "@fortawesome/free-solid-svg-icons";

import { useBattleRoomData } from "../../contexts/BattleContext";
import { useTabs } from "../../contexts/TabContext";

import { LineStrikeRoom } from "./LineStrikeRoom";

export function BattlePage() {
  const { battleID } = useParams();
  const tabs = useTabs();
  const room = useBattleRoomData(battleID);
  const location = useLocation();
  const id = `battles-${battleID}`;
  const href = `/play/battles/${battleID}`;
  useEffect(() => {
    tabs.ensure({
      id,
      name: room.title,
      icon: faChess,
      closable: room.status !== "loading",
      href,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, room, href]);
  if (room.state === "loading") {
    return <div>Loading...</div>;
  }
  if (room.state === "error") {
    return <div>Error...</div>;
  }
  const { handle, spectator } = room;
  if (!handle) return <div>Loading...</div>;
  
  return (
    <LineStrikeRoom
      room={handle}
      spectator={spectator}
      tabIndex={id}
      tabActive={href === location.pathname}
    />
  );
}
