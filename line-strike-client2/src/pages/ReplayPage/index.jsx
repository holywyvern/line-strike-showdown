import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { LineStrikeRoom } from "../BattlePage/LineStrikeRoom";

import { useTabs } from "../../contexts/TabContext";
import { useReplayRoomData } from "../../contexts/ReplayContext";

export function ReplayPage() {
  const { battleID } = useParams();
  const room = useReplayRoomData(battleID);
  const tabs = useTabs();
  const href = `/play/replays/${battleID}`;
  const id = `replays-${battleID}`;
  const tab = useMemo(
    () => ({
      id,
      name: room?.title,
      icon: faPlay,
      closable: true,
      href,
      music: tabs.activeTab?.music,
    }),
    [room?.title, href, id, tabs.activeTab?.music]
  );
  useEffect(() => {
    tabs.ensure(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  if (room.state === "loading") {
    return <div>Loading...</div>;
  }
  if (room.state === "error") {
    return <div>Error...</div>;
  }
  const { handle } = room;
  if (!handle) return <div>Loading...</div>;

  return (
    <LineStrikeRoom
      room={handle}
      spectator
      tabIndex={id}
      tabActive={href === location.pathname}
    />
  );
}
