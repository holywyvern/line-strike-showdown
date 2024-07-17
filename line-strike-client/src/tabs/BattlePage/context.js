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
  const room = useRoom();
  const [state, setState] = useState({ ...room.state });
  useEffect(() => {
    room.state.onChange(() => {
      setState({ ...room.state });
    });
  }, [room?.state]);
  return state;
}

export function usePlayerBoard(player, mirror, useTurn) {
  const usedBoard = useTurn ? player?.turn : player?.board;
  const [board, setBoard] = useState(() => ({ ...(usedBoard || {}) }));
  useEffect(() => {
    if (!usedBoard) return;

    usedBoard.onChange(() => setBoard((board) => ({ ...board, ...usedBoard })));
  }, [usedBoard]);
  let lanes = [...(board.lanes || [])];
  if (mirror) {
    lanes = lanes.reverse();
  }
  return {
    board,
    lanes,
  };
}

export function usePlayerState(player) {
  const [state, setState] = useState(() => ({ ...(player || {}) }));
  useEffect(() => {
    if (!player) return;

    setState((state) => ({ ...state, ...player }));
    player.onChange(() => setState((state) => ({ ...state, ...player })));
  }, [player]);
  return state;
}
