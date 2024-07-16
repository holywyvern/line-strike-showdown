import { Box } from "../../design/Box";
import { Button } from "../../design/Button";

export function MatchFinder() {
  return (
    <Box>
      <Box.Header>
        <h2>Battle Finder</h2>
      </Box.Header>
      <Box.Body>
        <Button disabled>Ranked Battle</Button>
        <Button disabled>Unranked Battle</Button>
      </Box.Body>
    </Box>
  );
}
