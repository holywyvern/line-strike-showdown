import { Outlet, useLoaderData } from "react-router-dom";
import { DatabaseContext } from "../contexts/DatabaseContext";
import { LineStrikeBackground } from "../design/LineStrikeBackground";

export function Root() {
  const { database } = useLoaderData();
  return (
    <DatabaseContext.Provider value={database}>
      <LineStrikeBackground />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Outlet />
      </div>
    </DatabaseContext.Provider>
  );
}
