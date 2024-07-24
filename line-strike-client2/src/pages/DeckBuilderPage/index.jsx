import { useParams } from "react-router-dom";
import { useDeckBuilderFormat } from "../../layouts/DeckBuilderLayout/context";
import { DeckEditor } from "./DeckEditor";
import { useProfile } from "../../contexts/ProfileContext";

export function DeckBuilderPage() {
  const profile = useProfile();
  const format = useDeckBuilderFormat();
  const params = useParams();
  const deckIndex = parseInt(params.deckIndex, 10);
  const deck = profile.decks[format.id]?.[deckIndex];
  if (!deck) return <div>Couldn&apos;t find deck</div>;
  return <DeckEditor formatID={format.id} deck={deck} index={deckIndex} />;
}
