import PropTypes from "prop-types";

import styles from "./styles.module.css";
import { MiniCard } from "../MiniCard";
import { useHoveredCard } from "../../context/HoveredCardContext";
import { CardArea } from "../../../../design/CollectionList";
import { useCards } from "../../../../hooks/useCards";

export function CardPlacingInfo({ card, pp, canPlace }) {
  const { skills } = useCards();
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  if (!card) return null;

  const onHover = () => setHoveredCard(card);
  return (
    <div className={styles.info}>
      <div className={styles.mini}>
        <MiniCard played card={card} scale={0.5} onHover={onHover} />
      </div>
      <div className={styles.area}>
        <CardArea card={card} skill={skills[card.skill.id]} />
      </div>
      <div className={styles.details}>
        <h3>{card.title}</h3>
        <h4>{card.name}</h4>
        <h5>{card.skill.name}</h5>
      </div>
      <div className={styles.cost}>
        {canPlace ? <>PP: {pp}</> : <>&times;</>}
      </div>
    </div>
  );
}

CardPlacingInfo.propTypes = {
  card: PropTypes.any,
  pp: PropTypes.number,
  canPlace: PropTypes.bool,
};
