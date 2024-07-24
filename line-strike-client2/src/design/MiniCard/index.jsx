import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

export function MiniCard({
  card,
  index,
  size,
  displacement,
  played,
  scale,
  onHover,
}) {
  const buffs = card.normalAttack && card.normalAttack < card.attack;
  const debuffs = card.normalAttack && card.normalAttack > card.attack;
  const className = cx(styles.mini, styles[card.element], {
    [styles.played]: played,
    [styles.buff]: buffs,
    [styles.debuff]: debuffs,
    [styles.dead]: card.attack < 1 || card.stunned || card.incapacitated,
  });
  return (
    <div
      onMouseEnter={onHover}
      className={className}
      style={{
        "--index": index,
        "--size": size,
        "--displacement": displacement,
        "--mini-scale": scale,
      }}
    >
      <div
        className={styles.art}
        style={{
          "--top": card.miniTop,
          "--left": card.miniLeft,
          "--img": `url('/cards/${card.artwork}')`,
        }}
      />
      <div className={styles.border} />
      <div className={styles.pp}>
        <img src="/pp_small.png" />
      </div>
      <div className={styles.atk}>
        <img src="/attack_small.png" />
      </div>
      <div className={styles.ppv}>{card.ppCost}</div>
      <div className={styles.atkv}>{card.attack}</div>
      <div className={styles.icons}>
        {card.baseGuard && <img src="/flags/base_guard.webp" />}
        {card.baseBuster && <img src="/flags/base_buster.webp" />}
      </div>
    </div>
  );
}

MiniCard.propTypes = {
  card: PropTypes.any,
  index: PropTypes.number,
  size: PropTypes.number,
  displacement: PropTypes.number,
  played: PropTypes.bool,
  scale: PropTypes.number,
  normalAttack: PropTypes.number,
  onHover: PropTypes.func,
};
