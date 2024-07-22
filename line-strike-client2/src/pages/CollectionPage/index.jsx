import { useMemo, useState } from "react";

import { CollectionPageLayout } from "../../layouts/CollectionPageLayout";

import { useDatabase } from "../../contexts/DatabaseContext";
import { FilteredCards } from "./components/FilteredCards";
import { DrawerFilters } from "./components/DrawerFilters";

import { CollectionContext } from "./context";

import { useSet } from "../../hooks/useSet";

import { ALL_COSTS, ALL_ELEMENTS } from "../../constants/data";

import { isAllowedInFormat } from "../../utils/isAllowedInFormat";

function useFiltered() {
  const { cards, collection, formats, skills } = useDatabase();
  const elements = useSet(ALL_ELEMENTS);
  const costs = useSet(ALL_COSTS);
  const [name, setName] = useState("");
  const selectedSkills = useSet(() => skills.filter(Boolean).map((i) => i.id));
  const selectedFormats = useSet(() =>
    formats.filter(Boolean).map((i) => i.id)
  );
  const library = useMemo(() => {
    let library = collection.map((i) => cards[i]);
    library = library.filter(
      (i) =>
        costs.has(i.ppCost) &&
        elements.has(i.element) &&
        selectedSkills.has(i.skill?.id) &&
        [...selectedFormats]
          .map((j) => formats[j])
          .some((j) => isAllowedInFormat(j, i))
    );
    if (name) {
      library = library.filter(
        (i) =>
          String(i.name)
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase()) ||
          String(i.title).toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return library;
  }, [
    cards,
    collection,
    elements,
    costs,
    name,
    formats,
    selectedFormats,
    selectedSkills,
  ]);
  return {
    cards: library,
    name,
    setName,
    elements,
    costs,
    formats,
    selectedFormats,
    selectedSkills,
  };
}

export function CollectionPage() {
  const state = useFiltered();
  return (
    <CollectionContext.Provider value={state}>
      <CollectionPageLayout>
        <FilteredCards />
        <DrawerFilters />
      </CollectionPageLayout>
    </CollectionContext.Provider>
  );
}
