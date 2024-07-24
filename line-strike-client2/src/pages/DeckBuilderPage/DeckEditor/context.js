import { createContext, useState } from "react";

import { useDatabase } from "../../../contexts/DatabaseContext";
import { useProfile } from "../../../contexts/ProfileContext";

import { isAllowedInFormat } from "../../../utils/isAllowedInFormat";

export const Context = createContext();

export function useDeckEditorState({ formatID, deck, index }) {
  const db = useDatabase();
  const { changeDeck } = useProfile();
  const [defaultDeck, setDefaultDeck] = useState(deck);
  const [noChanges, setNoChanges] = useState(true);
  const [name, setName] = useState(deck.name);
  const [sleeve, setSleeve] = useState(deck.sleeve);
  const [playmat, setPlaymat] = useState(deck.playmat);
  const [playmatOpacity, setPlaymatOpacity] = useState(deck.playmatOpacity);
  const [cards, setCards] = useState(deck.cards);
  const onSave = () => {
    const newDeck = {
      name,
      playmatOpacity,
      sleeve,
      playmat,
      cards,
      formatID,
    };
    setDefaultDeck(newDeck);
    changeDeck(formatID, index, newDeck);
    setNoChanges(true);
  };
  const onReset = () => {
    setName(defaultDeck.name);
    setSleeve(defaultDeck.sleeve);
    setPlaymat(defaultDeck.playmat);
    setPlaymatOpacity(defaultDeck.playmatOpacity);
    setCards(defaultDeck.cards);
    setNoChanges(true);
  };
  const removeCard = (index) => {
    setCards((cards) => {
      if (index < 0 || index >= cards.length) return cards;

      const newCards = [...cards];
      newCards.splice(index, 1);
      setNoChanges(false);
      return newCards;
    });
  };
  const cardElements = [...new Set(cards.map((i) => db.cards[i].element))];
  const format = db.formats[formatID];
  const isValid =
    format.minCards <= cards.length &&
    format.maxCards >= cards.length &&
    cards
      .map((i) => db.cards[i])
      .every((card) => isAllowedInFormat(format, card, cardElements));
  return {
    name,
    setName,
    sleeve,
    setSleeve,
    setNoChanges,
    playmat,
    setPlaymat,
    playmatOpacity,
    setPlaymatOpacity,
    noChanges,
    cards,
    setCards,
    removeCard,
    onSave,
    onReset,
    isValid,
    format,
    cardElements,
  };
}
