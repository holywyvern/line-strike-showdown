import PropTypes from "prop-types";

import { useDatabase } from "../contexts/DatabaseContext";

import { Select } from "../design/Select";

export function FormatPicker({ name, value, onChange }) {
  const { standardFormatID, formats } = useDatabase();
  const standardFormat = formats[standardFormatID];
  const officialFormats = formats.filter((i) => i?.official);
  const customFormats = formats.filter((i) => i && !i.official);
  return (
    <Select name={name} value={value} onChange={onChange}>
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

FormatPicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
