import { Box } from "../../design/Box";
import { Select } from "../../design/Select";

import { useCards } from "../../hooks/useCards";
import { useProfile } from "../../hooks/useProfile";

export function FormatSelector() {
  const { formats, standardFormatID } = useCards();
  const { formatID, setFormatID } = useProfile();
  const format = formats[formatID];
  const standardFormat = formats[standardFormatID];
  const customFormats = formats
    .filter((i) => i && !i.official)
    .map((format) => (
      <Select.Option key={format.id} value={format.id}>
        {format.name}
      </Select.Option>
    ));
  return (
    <Box>
      <Box.Header>
        <h2>Selected Format</h2>
      </Box.Header>
      <Box.Body>
        <form onSubmit={(e) => e.preventDefault()}>
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
              {formats
                .filter((i) => i?.official)
                .map((format) => (
                  <Select.Option key={format.id} value={format.id}>
                    {format.name}
                  </Select.Option>
                ))}
            </Select.Group>
            {customFormats.length > 0 && (
              <Select.Group label="Custom Formats">
                {customFormats}
              </Select.Group>
            )}
          </Select>
          <p style={{ padding: 0, margin: 0, whiteSpace: "pre-line" }}>
            {formatID === standardFormatID
              ? "Latest version of LINE STRIKE\navailable to play on NGS: PSO2."
              : format?.description}
          </p>
        </form>
      </Box.Body>
    </Box>
  );
}
