import PropTypes from "prop-types";

import { Context } from "../hooks/useLobby";

import colyseus from "../services/colyseus";
import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { CenterView } from "../design/CenterView";
import { useTabs } from "../hooks/useTabs";
import { BattlePage } from "../tabs/BattlePage";
import { useCards } from "../hooks/useCards";

const BATTLE_TYPES = {};

function useLobby() {
  const [state, setState] = useState("pending");
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState({});
  const [queue, setQueue] = useState(null);
  const [challenges, setChallenges] = useState({});
  const { addTab } = useTabs();
  const { name } = useProfile();
  const { formats } = useCards();
  useEffect(() => {
    const onJoin = (room) => {
      setRoom(room);
      setState("loaded");
    };
    const onError = () => {
      setState("error");
    };
    setState("joining");
    colyseus.joinLobby(name).then(onJoin, onError);
  }, [name]);
  useEffect(() => {
    if (!room) return;

    room.onMessage("queue", async (data) => {
      if (!data) {
        setQueue(null);
        return;
      }
      const { seat, since, type } = data;
      const match = await colyseus.queue(seat);
      setQueue({ match, seat, since, type });
    });

    room.onMessage(
      "battle",
      async ({
        challenged,
        challenger,
        seat,
        opponent,
        type,
        formatID,
        spectator,
      }) => {
        const room = await colyseus.joinBattle(seat);
        addTab(
          `${
            spectator
              ? `${challenger.name} vs ${challenged.name}`
              : `Vs ${opponent}`
          } (${BATTLE_TYPES[type] || "Free Battle"}) [${
            formats[formatID].name
          }]`,
          <BattlePage room={room} spectator={spectator} />,
          {
            closable: true,
            warning: spectator ? null : (
              <>
                Closing this tab will count as a <strong>defeat</strong> while
                the match is still ongoing.
                <br />
                Are you sure you want to close this tab?
              </>
            ),
          }
        );
      }
    );

    room.state.players.onAdd((player, key) => {
      setPlayers((players) => ({ ...players, [key]: player }));
    });

    room.state.players.onRemove((_, key) => {
      setPlayers((players) => {
        const newPlayers = { ...players };
        delete newPlayers[key];
        return newPlayers;
      });
    });

    return () => {
      room.leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  const id = room?.sessionId;
  const me = players[id];
  useEffect(() => {
    if (!me?.challenges) return;

    me.challenges.onAdd((player, key) => {
      setChallenges((challenges) => {
        const newChallenges = { ...challenges };
        newChallenges[key] = player;
        return newChallenges;
      });
    });
    me.challenges.onRemove((_, key) => {
      setChallenges((challenges) => {
        const newChallenges = { ...challenges };
        delete newChallenges[key];
        return newChallenges;
      });
    });
  }, [me, me?.challenges]);
  return {
    state,
    queue,
    me,
    room,
    players,
    challenges,
    async cancelQueue() {
      try {
        queue?.match?.leave();
      } catch (error) {
        console.error(error);
      }
      setQueue(null);
    },
    id,
    isLoading: state === "pending" || state === "joining",
    isLoaded: state === "loaded",
  };
}

export function LobbyContext({ children }) {
  const api = useLobby();
  if (api.isLoading) {
    return <CenterView>Connecting To Lobby...</CenterView>;
  }
  return <Context.Provider value={api}>{children}</Context.Provider>;
}

LobbyContext.propTypes = {
  children: PropTypes.node,
};
