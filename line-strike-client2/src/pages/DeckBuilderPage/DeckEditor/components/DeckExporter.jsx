import { useContext, useMemo, useState } from "react";

import { Context } from "../context";

import { Button } from "../../../../design/Button";
import { Modal } from "../../../../design/Modal";
import { TextArea } from "../../../../design/TextArea";
import { Dialog } from "../../../../design/Dialog";

function exportCode(deck) {
  return btoa(JSON.stringify(deck));
}

function importDeck(code) {
  return JSON.parse(atob(code));
}

function Exporter() {
  const { name, sleeve, playmat, playmatOpacity, isValid, cards, formatID } =
    useContext(Context);
  const [visible, setVisible] = useState(false);
  const code = useMemo(
    () =>
      exportCode({
        name,
        sleeve,
        playmat,
        playmatOpacity,
        cards,
        formatID,
      }),
    [name, sleeve, playmat, playmatOpacity, cards, formatID]
  );
  return (
    <>
      <Button onClick={() => setVisible(true)} disabled={!isValid}>
        Export Deck
      </Button>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <Dialog>
          <Dialog.Header>
            <h2>Export code</h2>
          </Dialog.Header>
          <Dialog.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(code);
                setVisible(false);
              }}
            >
              <p style={{ padding: 0, margin: 0 }}>
                Use this code to share your deck!
              </p>
              <TextArea
                name="export_code"
                readOnly
                onChange={() => {}}
                value={code}
              />
              <Button type="submit">Copy to clipboard</Button>
            </form>
          </Dialog.Body>
        </Dialog>
      </Modal>
    </>
  );
}

function Importer() {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const {
    setName,
    setSleeve,
    setPlaymat,
    setPlaymatOpacity,
    setCards,
    setNoChanges,
  } = useContext(Context);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Import Deck</Button>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <Dialog>
          <Dialog.Header>
            <h2>Import code</h2>
          </Dialog.Header>
          <Dialog.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const deck = importDeck(code);
                setName(deck.name);
                setSleeve(deck.sleeve);
                setPlaymat(deck.playmat);
                setPlaymatOpacity(deck.playmatOpacity);
                setCards(deck.cards);
                setCode("");
                setVisible(false);
                setNoChanges(false);
              }}
            >
              <TextArea
                name="import_code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Set deck code here..."
              />
              <Button type="submit">Import Deck</Button>
            </form>
          </Dialog.Body>
        </Dialog>
      </Modal>
    </>
  );
}

export function DeckExporter() {
  return (
    <Dialog>
      <Dialog.Header>
        <h2>Import / Export</h2>
      </Dialog.Header>
      <Dialog.Body>
        <Exporter />
        <Importer />
      </Dialog.Body>
    </Dialog>
  );
}
