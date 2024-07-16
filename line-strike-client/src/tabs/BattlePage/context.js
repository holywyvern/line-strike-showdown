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
