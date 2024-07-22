import { useState } from "react";

import { Button } from "../../design/Button";
import { CenterView } from "../../design/CenterView";
import { Dialog } from "../../design/Dialog";
import { Form } from "../../design/Form";
import { Label } from "../../design/Label";
import { Logo } from "../../design/Logo";
import { Paragraph } from "../../design/Paragraph";
import { TextInput } from "../../design/TextInput";
import { useProfile } from "../../contexts/ProfileContext";

export function ProfileForm() {
  const profile = useProfile();
  const [name, setName] = useState("");
  return (
    <CenterView>
      <Dialog>
        <Dialog.Header>
          <h3>Welcome!</h3>
        </Dialog.Header>
        <Dialog.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              profile.signIn(name);
            }}
          >
            <Logo />
            <Paragraph>
              In order to continue you must select a name.
              <br />
              This name will be used to store your settings (In this device).
            </Paragraph>
            <Paragraph>You may change it later, if required.</Paragraph>
            <Form.Group>
              <Label htmlFor="name">Name</Label>
              <TextInput
                name="name"
                placeholder="Select a name..."
                required
                minLength={1}
                maxLength={16}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button disabled={name.length < 1} type="submit">
              Log in
            </Button>
          </Form>
        </Dialog.Body>
      </Dialog>
    </CenterView>
  );
}
