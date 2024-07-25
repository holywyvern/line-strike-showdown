import PropTypes from "prop-types";

import useIsMobile from "useismobile";

import { DeckBuildLayout } from "./design/DeckBuildLayout";

import { Context, useDeckEditorState } from "./context";

import { Column } from "../../../design/Column";

import { PropertiesBox } from "./components/PropertiesBox";
import { DeckExporter } from "./components/DeckExporter";
import { CollectionPicker } from "./components/CollectionPicker";
import { DeckBox } from "./components/DeckBox";
import { MobilePreview } from "./components/MobilePreview";

export function DeckEditor({ formatID, deck, index }) {
  const api = useDeckEditorState({ formatID, deck, index });
  const isMobile = useIsMobile();
  return (
    <Context.Provider value={api}>
      <DeckBuildLayout>
        <Column stretch={isMobile}>
          <PropertiesBox />
          <DeckExporter />
        </Column>
        {isMobile ? (
          <>
            <MobilePreview />
          </>
        ) : (
          <>
            <CollectionPicker />
            <DeckBox />
          </>
        )}
      </DeckBuildLayout>
    </Context.Provider>
  );
}

DeckEditor.propTypes = {
  deck: PropTypes.any,
  formatID: PropTypes.number,
  index: PropTypes.number,
};
