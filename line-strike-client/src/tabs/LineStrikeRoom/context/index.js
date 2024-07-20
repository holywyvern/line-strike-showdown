import { createContext, useContext, useEffect, useState } from "react";

export const LineStrikeRoomContext = createContext(null);

export function useBattleRoom() {
  return useContext(LineStrikeRoomContext);
}

export function useBattleRoomState() {
  const room = useBattleRoom();
  const [state, setState] = useState(() => ({ ...(room?.state || {}) }));
  useEffect(() => {
    if (!room) return;

    const onUpdate = (newState) => {
      setState((state) => ({ ...state, ...newState }));
    };
    room.onStateChange(onUpdate);
    onUpdate(room.state || {});
    return () => {
      room.onStateChange.remove(onUpdate);
    };
  }, [room]);
  return state;
}

export function useSchema(schema) {
  const [state, setState] = useState(() => ({ ...(schema || {}) }));
  useEffect(() => {
    if (!schema) return;

    schema.onChange(() =>
      setState((state) => {
        return { ...state, ...schema };
      })
    );
  }, [schema]);
  return state;
}

export function usePlayers() {
  const room = useBattleRoom();
  const state = useBattleRoomState();
  const top =
    state.playerA.sessionID === room.sessionId ? state.playerB : state.playerA;
  const bottom =
    state.playerA.sessionID === room.sessionId ? state.playerA : state.playerB;
  const playing = bottom.sessionID === room.sessionId;

  return { top, bottom, playing };
}

export function useBoard(player, mirror, playing) {
  const board = playing ? player.turn : player.board;
  const state = useSchema(board);
  if (mirror) {
    state.lanes = [...state.lanes].reverse();
  }
  return state;
}

export function useArraySchema(array) {
  const [state, setState] = useState(() => [...(array || [])]);

  useEffect(() => {
    if (!array) return;

    array.onAdd(() => {
      setState(() => [...array]);
    });

    array.onRemove(() => {
      setState(() => [...array]);
    });
  }, [array]);
  return state;
}
