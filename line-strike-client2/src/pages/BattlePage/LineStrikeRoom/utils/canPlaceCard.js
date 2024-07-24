export function canPlaceCard(cardID, status, skills, cards, player, pp) {
  const card = cards[cardID];
  if (status.justPlaced) return false;

  const ppLeft = player.pp - player.turn.usedPP;
  if (pp > ppLeft) return false;

  const oldCard = cards[status.cardID];
  if (!oldCard) return true;
  if (oldCard.ppCost >= card.ppCost) return false;
  if (card.element === oldCard.element) return true;

  const skill = skills[oldCard.skill.id];
  if (!skill) return false;

  return skill.tags.includes("wildcard");
}
