import { CollectionDrawer } from "../design/CollectionDrawer";
import { CostFilters } from "./CostFilters";
import { ElementFilters } from "./ElementFilters";
import { FormatFilters } from "./FormatFilters";

import { NameFilter } from "./NameFilter";
import { SkillFilters } from "./SkillFilters";

export function DrawerFilters() {
  return (
    <CollectionDrawer>
      <form onSubmit={(e) => e.preventDefault()}>
        <NameFilter />
        <CostFilters />
        <ElementFilters />
        <SkillFilters />
        <FormatFilters />
      </form>
    </CollectionDrawer>
  );
}
