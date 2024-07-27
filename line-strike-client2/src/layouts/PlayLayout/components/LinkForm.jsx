import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLink } from "../../../contexts/LinkContext";
import { useProfile } from "../../../contexts/ProfileContext";

import { Box } from "../../../design/Box";
import { Button } from "../../../design/Button";
import { Column } from "../../../design/Column";
import { Label } from "../../../design/Label";
import { TextInput } from "../../../design/TextInput";
import { Separator } from "../../../design/Separator";
import { Row } from "../../../design/Row";

function SignInForm() {
  const { signIn, isLoading } = useLink();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { name } = useProfile();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    signIn(email, password, name);
  };
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Label>Email</Label>
        <TextInput
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Password</Label>
        <TextInput
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          Sign In
        </Button>
      </form>
    </Box>
  );
}

function SignUpForm() {
  const { signUp, isLoading } = useLink();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { name } = useProfile();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    signUp(email, password, name);
  };
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Label>Email</Label>
        <TextInput
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Password</Label>
        <TextInput
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          Create Account
        </Button>
        <Separator />
        <p>
          By linking your email, you accept the{" "}
          <Link to="/terms-and-conditions">Terms and conditions</Link>.
        </p>
      </form>
    </Box>
  );
}

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Label>Email</Label>
        <TextInput
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button disabled type="submit">
          Recover password
        </Button>
        <p>
          Sorry, this feature is disabled at the moment. Please contact Rex to
          reset your password.
        </p>
      </form>
    </Box>
  );
}

function Unlink() {
  const { account, signOut } = useLink();
  const navigate = useNavigate();
  return (
    <Box>
      <Column>
        <span>
          Linked as: <strong>{account.email}</strong>.
        </span>
        <Button onClick={() => navigate(`/play/accounts/${account.id}`)}>
          Profile
        </Button>
        <Button onClick={signOut}>Unlink</Button>
      </Column>
    </Box>
  );
}

function VerificationForm() {
  const [code, setCode] = useState("");
  const { account, verify, isBusy, sendVerification } = useLink();
  if (account.emailVerified) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await verify(code);
    setCode("");
  };

  return (
    <form onSubmit={onSubmit}>
      <p>
        This link account is not verified.
        <br />
        Please insert the code provided to your mail address.
      </p>
      <TextInput
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button disabled={isBusy} type="submit">
        Verify
      </Button>
      <Row centerVertically>
        <span>Didn&apos;t receive an email?</span>
        <Button disabled={isBusy} onClick={sendVerification} type="button">
          Send activation code again
        </Button>
      </Row>
    </form>
  );
}

export function LinkForm() {
  const { isLoading, isLinked } = useLink();

  const [type, setType] = useState(0);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isLinked) {
    return (
      <>
        <Unlink />
        <VerificationForm />
      </>
    );
  }

  let Component = SignInForm;

  if (type === 1) {
    Component = SignUpForm;
  } else if (type === 2) {
    Component = RecoverPassword;
  }

  return (
    <Column>
      <Row flex>
        <Button flex disabled={type === 0} onClick={() => setType(0)}>
          Sign In
        </Button>
        <Button flex disabled={type === 1} onClick={() => setType(1)}>
          Sign Up
        </Button>
        <Button flex disabled={type === 2} onClick={() => setType(2)}>
          Recover Password
        </Button>
      </Row>
      <Component />
    </Column>
  );
}
