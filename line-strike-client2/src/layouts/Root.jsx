import { Outlet, useLoaderData } from "react-router-dom";
import { DatabaseContext } from "../contexts/DatabaseContext";

export function Root() {
  const { database } = useLoaderData();
  return (
    <DatabaseContext.Provider value={database}>
      <Outlet />
    </DatabaseContext.Provider>
  );
}
