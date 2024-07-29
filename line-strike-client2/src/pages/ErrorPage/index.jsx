import { useNavigate, useRouteError } from "react-router-dom";
import { Dialog } from "../../design/Dialog";
import { Paragraph } from "../../design/Paragraph";
import { CenterView } from "../../design/CenterView";
import { Button } from "../../design/Button";
import { HyperLink } from "../../design/HyperLink";
import { Logo } from "../../design/Logo";

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <>
    <CenterView>
      <Dialog>
        <Dialog.Header>
          <h2>Ooops!</h2>
        </Dialog.Header>
        <Dialog.Body>
          <Logo />
          <Paragraph>Sorry, something unexpected happend and we can&apos;t display this page.</Paragraph>
          <Paragraph>
            If this is your first time experiencing this bug, please consider reporting it to the{" "}
            <HyperLink
              to="https://github.com/holywyvern/line-strike-showdown/issues"
              external
            >
              Issue tracker
            </HyperLink>
            .
          </Paragraph>
          <Button size="xl" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Dialog.Body>
      </Dialog>
    </CenterView></>
  );
}
