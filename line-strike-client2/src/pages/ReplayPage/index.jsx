import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { LineStrikeRoom } from "../BattlePage/LineStrikeRoom";

import { useTabs } from "../../contexts/TabContext";
import { useReplayRoomData } from "../../contexts/ReplayContext";
import { Loader } from "../../components/Loader";

export function ReplayPage() {
  const { battleID } = useParams();
  const [searchParams] = useSearchParams();
  const invert = searchParams.get("invert") === "1";
  const room = useReplayRoomData(battleID, invert);
  const tabs = useTabs();
  const path = `/play/replays/${battleID}`;
  const href = `${path}?invert=${searchParams.get("invert") || "0"}`;
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
  }, [id, room, href]);
  if (room.state === "loading") {
    return <Loader />;
  }
  if (room.state === "error") {
    return <div>Error...</div>;
  }
  const { handle } = room;
  if (!handle) return <Loader />;

  return (
    <LineStrikeRoom
      room={handle}
      spectator
      tabIndex={id}
      tabActive={path === location.pathname}
    />
  );
}
