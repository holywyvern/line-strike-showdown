import PropTypes from "prop-types";

import { useProfile } from "../../hooks/useProfile";
import { useCards } from "../../hooks/useCards";
import { useAssets } from "../../hooks/useAssets";

import { Spinner } from "../../design/Spinner";

export function Loader({ children }) {
  const profile = useProfile();
  const cards = useCards();
  const assets = useAssets();
  if (profile.isLoading) return <Spinner />;
  if (cards.isLoading) return <Spinner />;
  if (assets.isLoading) return <Spinner />;

  return children;
}

Loader.propTypes = {
  children: PropTypes.node,
};
