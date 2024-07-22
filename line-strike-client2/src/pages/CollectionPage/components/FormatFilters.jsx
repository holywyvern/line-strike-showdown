import { useDatabase } from "../../../contexts/DatabaseContext";
import { Checkbox } from "../../../design/Checkbox";
import { useFilteredCollection } from "../context";
import { Column } from "../design/Column";

export function FormatFilters() {
  const { formats } = useDatabase();
  const { selectedFormats } = useFilteredCollection();
  return (
    <>
      <h3>Filter by Format</h3>
      <Column>
        {formats.filter(Boolean).map((format) => (
          <Checkbox
            key={`format-${format.id}`}
            checked={selectedFormats.has(format.id)}
            onChange={(e) => {
              if (e.target.checked) {
                selectedFormats.add(format.id);
              } else {
                selectedFormats.delete(format.id);
              }
            }}
          >
            {format.name} {format.standard && "(Standard)"}
          </Checkbox>
        ))}
      </Column>
    </>
  );
}
