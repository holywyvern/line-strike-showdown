import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Heatmap({ area, enemy, flip }) {
  const className = cx(styles.area, { [styles.enemy]: enemy });
  const min = Math.min(...area);
  const max = Math.max(...area);
  const diff = max === min ? 1 : max - min;
  return (
    <>
      {enemy ? null : (
        <div className={cx(styles.fake, styles.enemy)}>
          <div className={styles.ref} />
          <div className={styles.ref} />
          <div className={styles.ref} />
        </div>
      )}
      <div className={className}>
        {area.map((i, index) => {
          let intensity = (i - min) / diff;
          if (flip) {
            intensity = 1 - intensity;
          }
          return (
            <div
              key={index}
              className={cx(styles.item, { [styles.active]: i })}
              style={{ "--intensity": intensity }}
            >
              <div className={styles.wrapper}>
                {i ? Math.floor(i * 100) / 100 : 0}
              </div>
            </div>
          );
        })}
      </div>
      {!enemy ? null : (
        <div className={cx(styles.fake)}>
          <div className={styles.ref} />
          <div className={styles.ref} />
          <div className={styles.ref} />
        </div>
      )}
    </>
  );
}

Heatmap.propTypes = {
  area: PropTypes.any,
  enemy: PropTypes.bool,
  flip: PropTypes.bool,
};
