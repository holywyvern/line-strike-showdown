import { Card } from "../../design/Card";
import { Column } from "../../design/Column";
import { useHoveredCard } from "./context";

export function CardInfo() {
  const [card] = useHoveredCard();
  return (
    <div
      style={{
        flex: 1,
        width: "185px",
        maxWidth: "185px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
      }}
    >
      <Column centerChildren>
        {card && <Card hiddenInfo card={card} scale={0.5} noHover />}
        {card && (
          <Column>
            <h3 style={{ margin: 0, padding: 0 }}>{card.name}</h3>
            <h4 style={{ margin: 0, padding: 0 }}>{card.skill.name}</h4>
            <p style={{ margin: 0, padding: 0 }}>{card.skill.description}</p>
          </Column>
        )}
      </Column>
    </div>
  );
}
