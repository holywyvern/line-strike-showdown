import { createContext, useContext, useEffect, useState } from "react";

export const Context = createContext();

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
  const [board, setBoard] = useState({ ...player.board });
  useEffect(() => {
    if (!player?.board) return;

    player.board.onChange(() => setBoard({ ...player.board }));
  }, [player?.board]);
  return {
    board,
  };
}
