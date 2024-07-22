export function isAllowedInFormat(format, card) {
  if (!format.sets.includes(card.set)) return false;
  if (!format.allowedElements.includes(card.element)) return false;
  const limited = format.limitedCards[String(card.id)];
  if (typeof limited === "number" && limited < 1)
    return false;

  return true;
}
