import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

function LaneHpBarPart({ fill }) {
  const className = cx(styles.hp, { [styles.fill]: fill });
  return <div className={className} />;
}

export function LaneHpBar({ children, top, max }) {
  const className = cx(styles.bar, { [styles.top]: top });
  return (
    <div className={className} style={{ "--max": max }}>
      {children}
    </div>
  );
}

LaneHpBarPart.propTypes = {
  fill: PropTypes.bool,
};

LaneHpBar.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
  max: PropTypes.number,
};

LaneHpBar.Part = LaneHpBarPart;
