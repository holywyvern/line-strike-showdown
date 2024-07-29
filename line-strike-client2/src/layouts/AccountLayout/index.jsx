import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Tabs } from "../../design/Tabs";

const WRAPPER_STYLE = {
  flex: 1,
  display: "flex",
  padding: "var(--padding-md)",
  overflow: "hidden",
  flexDirection: "column",
};

const CONTENTS_STYLE = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const LAYOUT_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--gap-md)",
  alignItems: "stretch",
  justifyContent: "stretch",
  overflow: "auto",
};

export function AccountLayout() {
  const { accountID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div style={WRAPPER_STYLE}>
      <Tabs>
        <Tabs.Tab
          onClick={() => navigate(`/play/accounts/${accountID}`)}
          active={location.pathname === `/play/accounts/${accountID}`}
        >
          Stats
        </Tabs.Tab>
        <Tabs.Tab
          onClick={() => navigate(`/play/accounts/${accountID}/matches`)}
          active={location.pathname === `/play/accounts/${accountID}/matches`}
        >
          Matches
        </Tabs.Tab>
      </Tabs>
      <div style={CONTENTS_STYLE}>
        <div style={LAYOUT_STYLE}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
