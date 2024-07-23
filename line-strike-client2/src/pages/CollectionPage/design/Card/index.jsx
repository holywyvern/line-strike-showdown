import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Card({ card, scale = 1, children, hiddenInfo, noHover }) {
  return (
    <div className={styles.card} style={{ "--card-scale": scale }}>
      <img src={`/cards/${card.artwork}`} />
      <div className={styles.main}>
        {!hiddenInfo && card.title && (
          <span className={styles.title}>{card.title}</span>
        )}
        {!hiddenInfo && <span className={styles.name}>{card.name}</span>}
        {!hiddenInfo && <span className={styles.skill}>{card.skill.name}</span>}
      </div>
      {!noHover && (
        <div className={styles.info}>
          {children ? (
            children
          ) : (
            <>
              <h4>{card.skill.name}</h4>
              <p>{card.skill.description}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  card: PropTypes.any,
  scale: PropTypes.number,
  hiddenInfo: PropTypes.bool,
  noHover: PropTypes.bool,
};
