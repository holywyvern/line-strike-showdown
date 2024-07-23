import { DrawerFilters } from "../CollectionPage/components/DrawerFilters";
import { FilteredCards } from "../CollectionPage/components/FilteredCards";

import { CollectionContext, useFilteredState } from "../CollectionPage/context";

import { Layout } from "./design/Layout";

export function CollectionPlayPage() {
  const state = useFilteredState();
  return (
    <CollectionContext.Provider value={state}>
      <Layout>
        <Layout.Content>
          <FilteredCards />
        </Layout.Content>
        <DrawerFilters />
      </Layout>
    </CollectionContext.Provider>
  );
}
