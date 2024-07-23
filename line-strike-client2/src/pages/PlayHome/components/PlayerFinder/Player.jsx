import PropTypes from "prop-types";
import { List } from "../../../../design/List";

export function Player({ player }) {
  const { sessionID, name } = player;
  return <List.Item>{name}</List.Item>;
}

Player.propTypes = {
  player: PropTypes.any,
};
