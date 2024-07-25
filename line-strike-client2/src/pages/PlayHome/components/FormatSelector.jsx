import { FormatPicker } from "../../../components/FormatPicker";
import { useProfile } from "../../../contexts/ProfileContext";

export function FormatSelector() {
  const { formatID, setFormatID } = useProfile();
  return (
    <FormatPicker
      value={formatID}
      onChange={(e) => setFormatID(Number(e.target.value))}
    />
  );
}
