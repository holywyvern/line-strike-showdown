import PropTypes from "prop-types";

import { DeckBuildLayout } from "./design/DeckBuildLayout";

import { Context, useDeckEditorState } from "./context";

import { Column } from "../../../design/Column";

import { PropertiesBox } from "./components/PropertiesBox";
import { DeckExporter } from "./components/DeckExporter";
import { CollectionPicker } from "./components/CollectionPicker";
import { DeckBox } from "./components/DeckBox";

export function DeckEditor({ formatID, deck, index }) {
  const api = useDeckEditorState({ formatID, deck, index });
  return (
    <Context.Provider value={api}>
      <DeckBuildLayout>
        <Column>
          <PropertiesBox />
          <DeckExporter />
        </Column>
        <CollectionPicker />
        <DeckBox />
      </DeckBuildLayout>
    </Context.Provider>
  );
}

DeckEditor.propTypes = {
  deck: PropTypes.any,
  formatID: PropTypes.number,
  index: PropTypes.number,
};