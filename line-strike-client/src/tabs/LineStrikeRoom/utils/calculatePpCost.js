export function calculatePpCost(cardID, status, skills, cards, lanes, position) {
  const card = cards[cardID];
  let cost = card.ppCost;
  const oldCard = cards[status.cardID];
  if (oldCard) {
    cost -= oldCard.ppCost;
  }
  const skill = skills[card.skill.id];
  if (skill?.tags?.includes("reinforcement")) {
    const i = position % 3;
    const [a, b] = lanes;
    const laneA = a[i];
    const laneB = b[i];
    if (laneB.attack > laneA.attack) {
      cost -= 1;
    }
  }
  return Math.max(0, cost);
}
