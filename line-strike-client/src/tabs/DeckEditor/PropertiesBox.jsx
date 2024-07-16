import { useContext } from "react";

import { Box } from "../../design/Box";
import { TextInput } from "../../design/TextInput";
import { Button } from "../../design/Button";
import { RangeInput } from "../../design/RangeInput";

import { SleeveSelect } from "./SleeveSelect";
import { PlaymatSelect } from "./PlaymatSelect";

import { Context } from "./context";

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
  return (
    <Box>
      <Box.Header>
        <h2>Deck Properties</h2>
      </Box.Header>
      <Box.Body>
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
      </Box.Body>
    </Box>
  );
}
