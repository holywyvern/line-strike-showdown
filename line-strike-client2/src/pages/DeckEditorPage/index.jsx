import { useParams } from "react-router-dom";

export function DeckEditorPage() {
  const params = useParams();
  console.log(params);
  return <div>Deck Editor</div>;
}
