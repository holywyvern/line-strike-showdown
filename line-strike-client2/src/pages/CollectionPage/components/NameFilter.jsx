import { TextInput } from "../../../design/TextInput";

import { useFilteredCollection } from "../context";

export function NameFilter() {
  const { name, setName } = useFilteredCollection();
  return (
    <>
      <h3>Name Containing</h3>
      <TextInput
        name="name"
        placeholder="Name contains..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}
