import { Box } from "../../design/Box";
import { Select } from "../../design/Select";

import { useCards } from "../../hooks/useCards";
import { useProfile } from "../../hooks/useProfile";

export function FormatSelector() {
  const { formats, standardFormatID } = useCards();
  const { formatID, setFormatID } = useProfile();
  const format = formats[formatID];
  const standardFormat = formats[standardFormatID];
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
            <Select.Group label="All Formats">
              {formats.filter(Boolean).map((format) => (
                <Select.Option key={format.id} value={format.id}>
                  {format.name}
                </Select.Option>
              ))}
            </Select.Group>
          </Select>
          <p style={{ padding: 0, margin: 0, whiteSpace: "pre-line" }}>
            {format?.description}
          </p>
        </form>
      </Box.Body>
    </Box>
  );
}
