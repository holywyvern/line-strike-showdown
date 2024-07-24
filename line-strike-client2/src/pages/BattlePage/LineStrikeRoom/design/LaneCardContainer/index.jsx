import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

function LaneCardContainerCard({ children }) {
  return <div className={styles.card}>{children}</div>;
}

export function LaneCardContainer({
  children,
  top,
  active,
  disabled,
  onClick,
}) {
  const className = cx(styles.holder, {
    [styles.top]: top,
    [styles.active]: active,
  });
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

LaneCardContainer.Card = LaneCardContainerCard;

LaneCardContainerCard.propTypes = {
  children: PropTypes.node,
};

LaneCardContainer.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
