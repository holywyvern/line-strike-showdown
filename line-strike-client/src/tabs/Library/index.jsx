import { useMemo, useState } from "react";

import { LibraryLayout } from "../../design/LibraryLayout";
import { Sidenav } from "../../design/Sidenav";
import { Grid } from "../../design/Grid";
import { Checkbox } from "../../design/Checkbox";
import { CardList } from "../../design/CardList";
import { Card } from "../../design/Card";
import { TextInput } from "../../design/TextInput";
import { Column } from "../../design/Column";

import { useCards } from "../../hooks/useCards";

import { isAllowedInFormat } from "../../utils/isAllowedInFormat";
import { CostCheck } from "./CostCheck";
import { ElementCheck } from "./ElementCheck";

const DEFAULT_ELEMENTS = new Set([
  "fire",
  "ice",
  "wind",
  "lightning",
  "light",
  "darkness",
]);

const DEFAULT_COSTS = new Set([1, 2, 3, 4, 5]);

export function Library() {
  const { cards, collection, formats } = useCards();
  const [elements, setElements] = useState(DEFAULT_ELEMENTS);
  const [costs, setCosts] = useState(DEFAULT_COSTS);
  const [name, setName] = useState("");
  const [selectedFormats, setSelectedFormats] = useState(
    () => new Set(formats.filter(Boolean).map((i) => i.id))
  );
  const library = useMemo(() => {
    let library = collection.map((i) => cards[i]);
    library = library.filter(
      (i) =>
        costs.has(i.ppCost) &&
        elements.has(i.element) &&
        [...selectedFormats.values()]
          .map((j) => formats[j])
          .some((j) => isAllowedInFormat(j, i))
    );
    if (name) {
      library = library.filter((i) =>
        String(i.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return library;
  }, [cards, collection, elements, costs, name, formats, selectedFormats]);
  return (
    <LibraryLayout>
      <CardList>
        {library.map((i) => (
          <Card key={i.id} card={i} />
        ))}
      </CardList>
      <Sidenav>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Filters</h2>
          <h3>Name Containing</h3>
          <TextInput
            name="name"
            placeholder="Name contains..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3>Filter By Cost</h3>
          <Grid columns={3}>
            {[...DEFAULT_COSTS].map((cost) => (
              <CostCheck
                key={cost}
                cost={cost}
                costs={costs}
                setCosts={setCosts}
              />
            ))}
          </Grid>
          <h3>Filter By Element</h3>
          <Grid columns={3}>
            {[...DEFAULT_ELEMENTS].map((element) => (
              <ElementCheck
                key={element}
                element={element}
                visibleElements={elements}
                setVisibleElements={setElements}
              />
            ))}
          </Grid>
          <h3>Filter by Format</h3>
          <Column>
            {formats.filter(Boolean).map((format) => (
              <Checkbox
                key={`format-${format.id}`}
                checked={selectedFormats.has(format.id)}
                onChange={(e) =>
                  setSelectedFormats((formats) => {
                    const newFormats = new Set(formats);
                    if (e.target.checked) {
                      newFormats.add(format.id);
                    } else {
                      newFormats.delete(format.id);
                    }
                    return newFormats;
                  })
                }
              >
                {format.name} {format.standard && "(Standard)"}
              </Checkbox>
            ))}
          </Column>
        </form>
      </Sidenav>
    </LibraryLayout>
  );
}
