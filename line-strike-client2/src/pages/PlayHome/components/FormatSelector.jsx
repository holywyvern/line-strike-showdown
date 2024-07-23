import { useDatabase } from "../../../contexts/DatabaseContext";
import { useProfile } from "../../../contexts/ProfileContext";
import { Select } from "../../../design/Select";

export function FormatSelector() {
  const { standardFormatID, formats } = useDatabase();
  const { formatID, setFormatID } = useProfile();
  const standardFormat = formats[standardFormatID];
  const officialFormats = formats.filter((i) => i?.official);
  const customFormats = formats.filter((i) => i && !i.official);
  return (
    <Select
      name="format"
      value={formatID}
      onChange={(e) => setFormatID(Number(e.target.value))}
    >
      <Select.Group label="Current Formats">
        <Select.Option value={standardFormatID}>
          Standard ({standardFormat.name})
        </Select.Option>
      </Select.Group>
      <Select.Group label="Official Formats">
        {officialFormats.map((format) => (
          <Select.Option key={format.id} value={format.id}>
            {format.name}
          </Select.Option>
        ))}
      </Select.Group>
      {customFormats.length > 0 && (
        <Select.Group label="Custom Formats">
          {customFormats.map((format) => (
            <Select.Option key={format.id} value={format.id}>
              {format.name}
            </Select.Option>
          ))}
        </Select.Group>
      )}
    </Select>
  );
}
