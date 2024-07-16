import { Button } from "../../design/Button";
import { Navbar } from "../../design/Navbar";
import { useProfile } from "../../hooks/useProfile";

export function AppNavbar() {
  const profile = useProfile();
  return (
    <Navbar>
      <Navbar.Title>
        <img src="icon.webp" alt="Line Strike Logo" />
        &nbsp;
        LINE STRIKE SHOWDOWN
      </Navbar.Title>
      <Navbar.User>
        <span>
          Hey there, <strong>{profile.name}</strong>!
        </span>
        <Button onClick={() => profile.changeName("")} link>
          Change Profile
        </Button>
      </Navbar.User>
    </Navbar>
  );
}
