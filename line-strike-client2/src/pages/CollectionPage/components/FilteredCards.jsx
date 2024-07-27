import { useState } from "react";
import useIsMobile from "useismobile";

import { useFilteredCollection } from "../context";

import { Card } from "../design/Card";
import { CardList } from "../design/CardList";
import { Column } from "../design/Column";
import { Tabs } from "../../../design/Tabs";
import { Separator } from "../../../design/Separator";
import { Row } from "../../../design/Row";
import { useDatabase } from "../../../contexts/DatabaseContext";
import { Heatmap } from "../design/Heatmap";

function Preview() {
  const isMobile = useIsMobile();
  const { cards } = useFilteredCollection();
  return (
    <CardList>
      {cards.map((i) => (
        <Card scale={isMobile ? 0.5 : 1} key={i.id} card={i} />
      ))}
    </CardList>
  );
}

function Heatmaps() {
  const { skills } = useDatabase();
  const { cards } = useFilteredCollection();

  const averageBuff = () => {
    const result = new Array(9).fill(0);
    let count = 0;
    for (const card of cards) {
      const skill = skills[card.skillID];
      if (skill.tags.includes("buff")) {
        for (let i = 0; i < 9; ++i) {
          result[i] += card.area[i];
        }
        count++;
      }
    }
    if (count) {
      return result.map((i) => i / count);
    }
    return result;
  };

  const averageDebuff = () => {
    const result = new Array(9).fill(0);
    let count = 0;
    for (const card of cards) {
      const skill = skills[card.skillID];
      if (skill.tags.includes("debuff")) {
        for (let i = 0; i < 9; ++i) {
          result[i] += card.area[i];
        }
        count++;
      }
    }
    if (count) {
      return result.map((i) => i / count);
    }
    return result;
  };

  const affectedPlayerAreas = () => {
    const result = new Array(9).fill(0);
    for (const card of cards) {
      const skill = skills[card.skillID];
      if (skill.tags.includes("debuff")) {
        for (let i = 0; i < 9; ++i) {
          if (card.displayArea[i]) {
            result[i] += 1;
          }
        }
      }
    }
    return result;
  };

  const affectedEnemyAreas = () => {
    const result = new Array(9).fill(0);
    for (const card of cards) {
      const skill = skills[card.skillID];
      if (skill.tags.includes("debuff")) {
        for (let i = 0; i < 9; ++i) {
          if (card.displayArea[i]) {
            result[i] += 1;
          }
        }
      }
    }
    return result;
  };

  return (
    <>
      <div style={{ padding: "var(--padding-md)" }}>
        <p>
          These are the heatmaps for the selected {cards.length} card
          {cards.length === 1 ? "" : "s"}.
        </p>
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <Column center>
          <h3>Average Buff</h3>
          <Heatmap area={averageBuff()} />
        </Column>
        <Column center>
          <h3>Average Debuff</h3>
          <Heatmap area={averageDebuff()} enemy flip />
        </Column>
        <Column center>
          <h3>Times your area is affected</h3>
          <Heatmap area={affectedPlayerAreas()} />
        </Column>
        <Column center>
          <h3>Times an enemy area is affected</h3>
          <Heatmap area={affectedEnemyAreas()} enemy />
        </Column>
      </div>
    </>
  );
}

export function FilteredCards() {
  const [selected, setSelected] = useState(0);
  let Component = Preview;

  if (selected === 1) {
    Component = Heatmaps;
  }
  return (
    <Column flex>
      <Column>
        <Tabs>
          <Tabs.Tab active={selected === 0} onClick={() => setSelected(0)}>
            Collection
          </Tabs.Tab>
          <Tabs.Tab active={selected === 1} onClick={() => setSelected(1)}>
            Heatmaps
          </Tabs.Tab>
        </Tabs>
      </Column>
      <Separator />
      <Component />
    </Column>
  );
}
