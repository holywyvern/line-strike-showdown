import { CollectionPageLayout } from "../../layouts/CollectionPageLayout";

import { FilteredCards } from "./components/FilteredCards";
import { DrawerFilters } from "./components/DrawerFilters";

import { CollectionContext, useFilteredState } from "./context";


export function CollectionPage() {
  const state = useFilteredState();
  return (
    <CollectionContext.Provider value={state}>
      <CollectionPageLayout>
        <FilteredCards />
        <DrawerFilters />
      </CollectionPageLayout>
    </CollectionContext.Provider>
  );
}
