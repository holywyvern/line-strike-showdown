import PropTypes from "prop-types";

import { useProfile } from "../../contexts/ProfileContext";

import { ProfileForm } from "./ProfileForm";

export function ProfileEnforcer({ children }) {
  const profile = useProfile();
  if (profile.isLoading) {
    return <div />;
  }
  if (!profile.name) {
    return <ProfileForm />;
  }
  return children;
}

ProfileEnforcer.propTypes = {
  children: PropTypes.node,
};
