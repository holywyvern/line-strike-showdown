import { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

import { isAllowedInFormat } from "../../../../../utils/isAllowedInFormat";

import { MiniCard } from "../../../../../design/MiniCard";
import { Badge } from "../../../../../design/Badge";
import { Modal } from "../../../../../design/Modal";
import { Button } from "../../../../../design/Button";

import { Card } from "../../../../CollectionPage/design/Card";

const BUFFS = ["buff", "debuff"];

const SWAPS = ["moveEnemy", "moveAlly", "swapEnemy", "swapAlly"];

const AREA_EFFECTS = [...BUFFS, ...SWAPS, "stun"];

const ARROWS = {
  2: "🠋",
  4: "🠈",
  6: "🠊",
  8: "🠉",
};

function hasArea(skill) {
  return AREA_EFFECTS.some((i) => skill.tags.includes(i));
}

function value(skill, area) {
  if (!area) return null;
  if (skill.tags.includes("stun")) return <>&times;</>;
  if (BUFFS.some((i) => skill.tags.includes(i)))
    return (area < 0 ? "" : "+") + area;

  if (SWAPS.some((i) => skill.tags.includes(i))) return ARROWS[area];
  return null;
}

export function CardArea({ skill, card }) {
  const showArea = hasArea(skill);
  return (
    <div className={cx(styles.grid, { [styles[skill?.category]]: showArea })}>
      {showArea &&
        card.displayArea.map((i, index) => {
          return (
            <div
              key={index}
              className={cx(styles.area, { [styles.highlight]: i })}
            >
              {value(skill, i)}
            </div>
          );
        })}
    </div>
  );
}

CardArea.propTypes = {
  skill: PropTypes.any,
  card: PropTypes.any,
};

function CollectionListItem({
  size = 0,
  card,
  count = 0,
  onAdd,
  onRemove,
  format,
  deckElements,
  skills,
}) {
  const skill = skills[card.skillID];
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
          <CardArea skill={skill} card={card} />
          <div>
            <div className={styles.title}>
              <img src={`/elements/${card.element}.webp`} />
              <h3>
                <small>{card.title}</small>
                {` ${card.name}`} {isIllegal && <Badge>ILLEGAL</Badge>}
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
  skills: PropTypes.any,
};

CollectionList.propTypes = {
  children: PropTypes.node,
};
