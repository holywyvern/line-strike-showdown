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

export function usePlayerBoard(player, mirror) {
  const [board, setBoard] = useState({ ...(player.board || {}) });
  useEffect(() => {
    if (!player?.board) return;

    player.board.onChange(() => setBoard({ ...player.board }));
  }, [player?.board]);
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
  const [state, setState] = useState({ ...(player || {}) });
  useEffect(() => {
    if (!player) return;

    player.onChange(() => setState({ ...player }));
  }, [player]);
  return state;
}
