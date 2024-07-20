import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

import { Button } from "../Button";
import { Modal } from "../Modal";
import { Card } from "../Card";
import { isAllowedInFormat } from "../../utils/isAllowedInFormat";
import { Badge } from "../Badge";
import { MiniCard } from "../../tabs/LineStrikeRoom/design/MiniCard";

function CollectionListItem({
  size = 0,
  card,
  count = 0,
  onAdd,
  onRemove,
  format,
  deckElements,
}) {
  const [visible, setVisible] = useState(false);
  const incorrectElement =
    deckElements.length >= format.maxElements &&
    !deckElements.includes(card.element);
  const isIllegal = !isAllowedInFormat(format, card);
  const isDeckFull = size >= format.maxCards;
  const limited = format.limitedCards[String(card.id)];
  const maxRepeats =
    typeof limited === "number"
      ? format.limitedCards[String(card.id)]
      : format.maxRepeats;
  const isLimited = maxRepeats < format.maxRepeats && maxRepeats > 0;
  const allowRepeat = count >= maxRepeats;
  const disabled = incorrectElement || isIllegal || allowRepeat || isDeckFull;
  return (
    <>
      <li>
        <div className={styles.main}>
          <button
            className={styles.mini}
            type="button"
            onClick={() => setVisible(true)}
          >
            <MiniCard played card={card} scale={0.5} />
          </button>
          <div>
            <div className={styles.title}>
              <img src={`elements/${card.element}.webp`} />
              <h3>
                {card.name} {isIllegal && <Badge>ILLEGAL</Badge>}
                {isLimited && <Badge>LIMITED TO {maxRepeats}</Badge>}
              </h3>
            </div>
            <span>{card.skill.name}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <span>{count} / 3</span>
          <div className={styles.actions}>
            <Button monospace onClick={onRemove} disabled={count < 1}>
              -
            </Button>
            <Button monospace onClick={onAdd} disabled={disabled}>
              +
            </Button>
          </div>
        </div>
      </li>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <Card card={card} />
      </Modal>
    </>
  );
}

export function CollectionList({ children }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

CollectionList.Item = CollectionListItem;

CollectionListItem.propTypes = {
  card: PropTypes.any,
  size: PropTypes.number,
  count: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  deckElements: PropTypes.any,
  format: PropTypes.any,
};

CollectionList.propTypes = {
  children: PropTypes.node,
};
