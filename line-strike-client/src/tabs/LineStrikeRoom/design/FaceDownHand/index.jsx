import cx from "classnames";

import PropTypes from "prop-types";

import styles from "./styles.module.css";

export function FaceDownHand({
  sleeve = "blue_basic.webp",
  handSize = 0,
  mirror = false,
}) {
  const className = cx(styles.hand, { [styles.mirror]: mirror });
  return (
    <div className={className} style={{ "--size": handSize }}>
      {new Array(handSize).fill(null).map((_, index) => (
        <img
          key={index}
          src={`sleeves/${sleeve}`}
          className={styles.card}
          style={{ "--index": index }}
        />
      ))}
      {handSize ? (
        <div className={styles.count}>
          <div className={styles.shadow}>{handSize}</div>
        </div>
      ) : null}
    </div>
  );
}

FaceDownHand.propTypes = {
  sleeve: PropTypes.string,
  handSize: PropTypes.number,
  mirror: PropTypes.bool,
};
