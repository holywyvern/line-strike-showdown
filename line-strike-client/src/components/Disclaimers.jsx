import { Box } from "../design/Box";

export function Disclaimers() {
  return (
    <Box>
      <Box.Header>
        <h2>DISCLAIMER</h2>
      </Box.Header>
      <Box.Body>
        <p>
          This website is in <strong>alpha</strong>. A lot of features and things
          may not work properly.
        </p>
        <p>
          Are you a developer and want to help? Contact me at Discord
          (rexmelynas).
        </p>
        <p>
          Do you want to see the code?,{" "}
          <a
            href="https://github.com/holywyvern/line-strike-showdown"
            target="_blank"
          >
            it&apos;s open source!
          </a>
        </p>
        <p>
          <strong>
            <a
              href="https://github.com/holywyvern/line-strike-showdown/issues"
              target="_blank"
            >
              Report bugs here!
            </a>
          </strong>
        </p>
      </Box.Body>
    </Box>
  );
}
