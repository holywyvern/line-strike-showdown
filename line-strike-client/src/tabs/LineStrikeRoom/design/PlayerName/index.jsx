import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function PlayerName({ player, top }) {
  const className = cx(styles.name, { [styles.top]: top });
  return <div className={className}>{player.name}</div>;
}

PlayerName.propTypes = {
  player: PropTypes.any,
  top: PropTypes.bool,
};
