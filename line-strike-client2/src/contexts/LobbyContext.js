import { createContext } from "react";

export const LobbyContext = createContext({ status: "pending", room: null });
