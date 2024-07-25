import { useContext } from "react";

import useIsMobile from "useismobile";

import { SleeveSelect } from "./SleeveSelect";
import { PlaymatSelect } from "./PlaymatSelect";

import { Context } from "../context";

import { Dialog } from "../../../../design/Dialog";
import { TextInput } from "../../../../design/TextInput";
import { RangeInput } from "../../../../design/RangeInput";
import { Button } from "../../../../design/Button";

export function PropertiesBox() {
  const {
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
    onSave,
    isValid,
  } = useContext(Context);
  const isMobile = useIsMobile();
  return (
    <Dialog stretch={isMobile}>
      <Dialog.Header>
        <h2>Deck Properties</h2>
      </Dialog.Header>
      <Dialog.Body>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Name</label>
          <TextInput
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNoChanges(false);
            }}
          />
          <label>Sleeve</label>
          <SleeveSelect
            name="sleeve"
            value={sleeve}
            onChange={(sleeve) => {
              setSleeve(sleeve);
              setNoChanges(false);
            }}
          />
          <label>Playmat</label>
          <PlaymatSelect
            name="playmat"
            value={playmat}
            onChange={(playmat) => {
              setPlaymat(playmat);
              setNoChanges(false);
            }}
          />
          <label>Playmat Opacity</label>
          <RangeInput
            showValue
            name="opacity"
            min={0}
            max={100}
            value={playmatOpacity}
            onChange={(e) => {
              setPlaymatOpacity(e.target.valueAsNumber);
              setNoChanges(false);
            }}
          />
          <Button disabled={noChanges || !isValid} onClick={onSave}>
            Save Deck
          </Button>
        </form>
      </Dialog.Body>
    </Dialog>
  );
}
