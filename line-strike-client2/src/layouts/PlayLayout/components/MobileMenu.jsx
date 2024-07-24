import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { AudioSettingsForm } from "./AudioSettingsForm";

import { Button } from "../../../design/Button";
import { RightMenu } from "../design/RightMenu";
import { FullscreenDrawer } from "../design/FullscreenDrawer";
import { Separator } from "../../../design/Separator";
import { Row } from "../../../design/Row";
import { Logo } from "../../../design/Logo";
import { Modal } from "../../../design/Modal";

import { useProfile } from "../../../contexts/ProfileContext";

export function MobileMenu() {
  const profile = useProfile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen((v) => !v);
  return (
    <>
      <RightMenu>
        <Button onClick={onToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </RightMenu>
      <FullscreenDrawer open={open} onClose={onToggle}>
        <Row spaceItems>
          <Logo />
          <Modal.Close onClick={onToggle} />
        </Row>
        <Row>
          Hey there, <strong>{profile.name}</strong>!
        </Row>
        <Separator />
        <Button
          onClick={() => {
            navigate("/play");
            setOpen(false);
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate("/play/cards");
            setOpen(false);
          }}
        >
          Card List
        </Button>
        <Button
          onClick={() => {
            navigate("/play/decks");
            setOpen(false);
          }}
        >
          Deck Builder
        </Button>
        <Separator />
        <AudioSettingsForm />
        <Separator />
      </FullscreenDrawer>
    </>
  );
}
