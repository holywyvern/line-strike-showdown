
import { Card } from "../../../CollectionPage/design/Card";

import { useHoveredCard } from "../context/HoveredCardContext";

export function HoveredCard() {
  const [card] = useHoveredCard();

  if (!card) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        maxWidth: "20%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card card={card} noHover />
      <h3
        style={{
          margin: 0,
          padding: 0,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {card.skill.name}
      </h3>
      <p
        style={{
          margin: 0,
          padding: 0,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {card.skill.description}
      </p>
    </div>
  );
}
