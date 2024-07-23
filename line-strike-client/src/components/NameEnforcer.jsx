import PropTypes from "prop-types";

import { useProfile } from "../hooks/useProfile";
import { CenterView } from "../design/CenterView";
import { Button } from "../design/Button";
import { TextInput } from "../design/TextInput";
import { Box } from "../design/Box";
import { InputRow } from "../design/InputRow";
import { Row } from "../design/Row";

function NameForm() {
  const profile = useProfile();
  /**
   * @type {(event: SubmitEvent) => any}
   */
  const onSubmit = (event) => {
    event.preventDefault();
    profile.changeName(event.target.name.value);
  };
  return (
    <CenterView>
      <form onSubmit={onSubmit}>
        <Box>
          <Box.Body>
            <Row center>
              <img
                src="/logo.png"
                alt="Line Strike Logo"
                style={{ maxWidth: "64px", alignSelf: "center" }}
              />
              <h2>LINE STRIKE SHOWDOWN</h2>
            </Row>
            <p>
              Welcome to the LINE STRIKE web simulator!
              <br />
              To play the web version of LINE STRIKE SHOWDOWN, you must give us
              a name!
              <br />
              You can change it anytime later.
              <br />
              This name will be used to store (in your computer) your deck
              configuration.
              <hr />
              This website is in no shape or form associated by SEGA.
            </p>
            <InputRow>
              <label htmlFor="name">Name:</label>
              <TextInput
                name="name"
                type="text"
                required
                minLength={1}
                maxLength={16}
                placeholder="Insert Your Name"
              />
            </InputRow>
            <Button type="submit">Select Name</Button>
          </Box.Body>
        </Box>
      </form>
    </CenterView>
  );
}

export function NameEnforcer({ children }) {
  const profile = useProfile();
  if (!profile.name) {
    return <NameForm />;
  }
  return <>{children}</>;
}

NameEnforcer.propTypes = {
  children: PropTypes.node,
};
