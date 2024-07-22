import { useNavigate } from "react-router-dom";

import { Button } from "../../design/Button";
import { HyperLink } from "../../design/HyperLink";
import { Paragraph } from "../../design/Paragraph";

import { HomePageLayout } from "../../layouts/HomePageLayout";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <HomePageLayout>
      <Paragraph>
        Line Strike Showdown is a simulator for the Card of the same name inside{" "}
        <HyperLink to="https://pso2.com/" external>
          Phantasy Star Online 2 New Genesis
        </HyperLink>
        .
      </Paragraph>
      <Paragraph>
        Play against other people, build new decks and share strategies about
        this card game on the web.
      </Paragraph>
      <Paragraph>
        This website is in an <strong>ALPHA</strong> state, so please help me on
        development by reporting bugs.
      </Paragraph>
      <Button.Group>
        <Button size="xl" onClick={() => navigate("/play")}>
          PLAY
        </Button>
      </Button.Group>
    </HomePageLayout>
  );
}
