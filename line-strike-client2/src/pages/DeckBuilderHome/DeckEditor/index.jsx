import PropTypes from "prop-types";

import { DeckBuildLayout } from "./design/DeckBuildLayout";

import { Context, useDeckEditorState } from "./context";

import { PropertiesBox } from "./PropertiesBox";
import { CollectionPicker } from "./CollectionPicker";
import { DeckBox } from "./DeckBox";
import { DeckExporter } from "./DeckExporter";

import { Column } from "../../../design/Column";

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
