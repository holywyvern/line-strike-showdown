import { useDatabase } from "../../../contexts/DatabaseContext";
import { Checkbox } from "../../../design/Checkbox";
import { useFilteredCollection } from "../context";
import { Column } from "../design/Column";

export function SkillFilters() {
  const { skills } = useDatabase();
  const { selectedSkills } = useFilteredCollection();
  return (
    <>
      <h3>Filter by Skill</h3>
      <Column>
        {skills
          .filter(Boolean)
          .sort((a, b) => String(a.name).localeCompare(b.name))
          .map((skill) => (
            <Checkbox
              key={`skill-${skill.id}`}
              checked={selectedSkills.has(skill.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  selectedSkills.add(skill.id);
                } else {
                  selectedSkills.delete(skill.id);
                }
              }}
            >
              {skill.name}
            </Checkbox>
          ))}
      </Column>
    </>
  );
}
