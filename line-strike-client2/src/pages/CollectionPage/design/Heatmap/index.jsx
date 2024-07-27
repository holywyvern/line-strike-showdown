import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Heatmap({ area, enemy, flip }) {
  const className = cx(styles.area, { [styles.enemy]: enemy });
  const min = Math.min(...area);
  const max = Math.max(...area);
  const diff = max === min ? 1 : max - min;
  return (
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
  );
}

Heatmap.propTypes = {
  area: PropTypes.any,
  enemy: PropTypes.bool,
  flip: PropTypes.bool,
};
