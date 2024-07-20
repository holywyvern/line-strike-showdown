import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

import { Button } from "../../../../design/Button";

export function DrawerButton({ onClick, open }) {
  const className = cx(styles.button, { [styles.open]: open });
  return (
    <div className={className}>
      <Button onClick={onClick}>CHAT</Button>
    </div>
  );
}

DrawerButton.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
};
