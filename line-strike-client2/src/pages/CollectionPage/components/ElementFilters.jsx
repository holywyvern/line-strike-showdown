import { ALL_ELEMENTS } from "../../../constants/data";
import { useFilteredCollection } from "../context";
import { FilterBox } from "../design/FilterBox";
import { ElementCheck } from "./ElementCheck";

export function ElementFilters() {
  const { elements } = useFilteredCollection();
  return (
    <>
      <h3>Filter By Element</h3>
      <FilterBox>
        {ALL_ELEMENTS.map((element) => (
          <ElementCheck
            key={element}
            element={element}
            visibleElements={elements}
          />
        ))}
      </FilterBox>
    </>
  );
}
