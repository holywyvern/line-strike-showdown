import { Outlet, useLoaderData } from "react-router-dom";

import { LinkContext, useLinkState } from "../contexts/LinkContext";
import { DatabaseContext } from "../contexts/DatabaseContext";

import { LineStrikeBackground } from "../design/LineStrikeBackground";


export function Root() {
  const { database } = useLoaderData();
  const link = useLinkState();
  return (
    <LinkContext.Provider value={link}>
      <DatabaseContext.Provider value={database}>
        <LineStrikeBackground />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Outlet />
        </div>
      </DatabaseContext.Provider>
    </LinkContext.Provider>
  );
}
