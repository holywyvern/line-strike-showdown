import { ALL_COSTS } from "../../../constants/data";
import { useFilteredCollection } from "../context";
import { FilterBox } from "../design/FilterBox";
import { CostCheck } from "./CostCheck";

export function CostFilters() {
  const { costs } = useFilteredCollection();
  return (
    <>
      <h3>Filter By Cost</h3>
      <FilterBox>
        {ALL_COSTS.map((cost) => (
          <CostCheck key={cost} cost={cost} costs={costs} />
        ))}
      </FilterBox>
    </>
  );
}
