import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function Card({ card, scale = 1, children }) {
  return (
    <div className={styles.card} style={{ "--scale": scale }}>
      <img src={`cards/${card.artwork}`} />
      <div className={styles.main}>
        <span className={styles.name}>{card.name}</span>
        <span className={styles.skill}>{card.skill.name}</span>
      </div>
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
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  card: PropTypes.any,
  scale: PropTypes.number,
};
