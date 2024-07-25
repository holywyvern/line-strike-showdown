import { useContext } from "react";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { Dialog } from "../../../../design/Dialog";
import { Column } from "../../../../design/Column";

import { Context } from "../context";
import { CollectionPicker } from "./CollectionPicker";

export function MobilePreview() {
  const db = useDatabase();
  const { cards } = useContext(Context);
  const images = cards.map((i) => db.cards[i]?.artwork).filter(Boolean);
  return (
    <Column stretch>
      <CollectionPicker />
      <Dialog stretch>
        <Dialog.Header>
          <h2>Deck Cards</h2>
        </Dialog.Header>
        <Dialog.Body>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--gap-md)",
            }}
          >
            {images.map((i, index) => (
              <img key={index} src={`/cards/${i}`} style={{ width: "100%" }} />
            ))}
          </div>
        </Dialog.Body>
      </Dialog>
    </Column>
  );
}
