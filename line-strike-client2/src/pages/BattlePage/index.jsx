import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

import { faChess } from "@fortawesome/free-solid-svg-icons";

import { useBattleRoomData } from "../../contexts/BattleContext";
import { useTabs } from "../../contexts/TabContext";

import { LineStrikeRoom } from "./LineStrikeRoom";
import { Loader } from "../../components/Loader";

export function BattlePage() {
  const { battleID } = useParams();
  const tabs = useTabs();
  const room = useBattleRoomData(battleID);
  const location = useLocation();
  const id = `battles-${battleID}`;
  const href = `/play/battles/${battleID}`;
  const tab = useMemo(
    () => ({
      id,
      name: room?.title,
      icon: faChess,
      closable: room?.spectator || room?.status === "finished",
      href,
      music: tabs.activeTab?.music,
    }),
    [
      room?.spectator,
      room?.title,
      room?.status,
      href,
      id,
      tabs.activeTab?.music,
    ]
  );
  useEffect(() => {
    tabs.ensure(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, room, href]);
  if (room.state === "loading") {
    return <Loader />;
  }
  if (room.state === "error") {
    return <div>Error...</div>;
  }
  const { handle, spectator } = room;
  if (!handle) return <Loader />;

  return (
    <LineStrikeRoom
      room={handle}
      spectator={spectator}
      tabIndex={id}
      tabActive={href === location.pathname}
    />
  );
}
