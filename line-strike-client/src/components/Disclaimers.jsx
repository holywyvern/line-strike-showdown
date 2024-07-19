import { Box } from "../design/Box";

export function Disclaimers() {
  return (
    <Box>
      <Box.Header>
        <h2>DISCLAIMER</h2>
      </Box.Header>
      <Box.Body>
        <p style={{ margin: 0, padding: 0 }}>
          Never played <i>LINE STRIKE</i> before?{" "}
          <a href="https://pso2ngs.wiki/wiki/Line_Strike" target="_blank">
            Check out the wiki page to learn how to play!
          </a>
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          Welcome to the unofficial <i>LINE STRIKE</i> web simulator.
          <br />
          This web is designed to let players experiment with cards and builds
          without the need to open PSO2, anytime.
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          Note this website is in <strong>alpha</strong>. A lot of features and
          things may not work properly.
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          Are you a developer and want to help? Contact me at Discord
          (rexmelynas).
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          Do you want to see the code?{" "}
          <a
            href="https://github.com/holywyvern/line-strike-showdown"
            target="_blank"
          >
            it&apos;s open source, under GPL.
          </a>
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          <strong>
            <a
              href="https://github.com/holywyvern/line-strike-showdown/issues"
              target="_blank"
            >
              Report bugs here!
            </a>
          </strong>
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          Do you want to play the real deal?{" "}
          <a href="https://pso2.com/players/" target="_blank">
            Download Phantasy Star Online 2 New Genesis Version 2
          </a>
        </p>
      </Box.Body>
    </Box>
  );
}
