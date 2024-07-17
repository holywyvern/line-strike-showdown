import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

export const HoveredCard = createContext();

export function useHoveredCard() {
  return useContext(HoveredCard);
}

export function useRoom() {
  return useContext(Context);
}

export function useRoomState() {
  /** @type {import("colyseus.js").Room} */
  const room = useRoom();
  const [state, setState] = useState({ ...(room?.state || {}) });
  useEffect(() => {
    const onUpdate = (newState) => {
      setState((state) => ({ ...state, ...newState }));
    };
    room.onStateChange(onUpdate);
    return () => {
      room.onStateChange.remove(onUpdate);
    };
  }, [room]);
  return state;
}

export function usePlayerBoard(player, mirror, useTurn) {
  const usedBoard = useTurn ? player?.turn : player?.board;
  const [board, setBoard] = useState(() => ({ ...(usedBoard || {}) }));
  useEffect(() => {
    if (!usedBoard) return;

    setBoard((board) => ({ ...board, ...usedBoard }));
    usedBoard.onChange(() => {
      setBoard((board) => {
        const result = { ...board, ...usedBoard };
        return result;
      });
    });
  }, [usedBoard]);
  let lanes = [...(board.lanes || [])];
  if (mirror) {
    lanes = lanes.reverse();
  }
  return {
    board,
    locked: board?.locked || false,
    lanes,
  };
}

export function usePlayerState(player) {
  const [state, setState] = useState(() => ({ ...(player || {}) }));
  useEffect(() => {
    if (!player) return;

    setState((state) => ({ ...state, ...player }));
    player.onChange(() =>
      setState((state) => {
        const result = { ...state, ...player };
        return result;
      })
    );
  }, [player]);
  return state;
}
