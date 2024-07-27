import { useLoaderData } from "react-router-dom";

import { Dialog } from "../../design/Dialog";

import { List } from "../../design/List";
import { CenterView } from "../../design/CenterView";

export function AccountPage() {
  const account = useLoaderData();
  if (!account) {
    return (
      <CenterView>
        <Dialog>
          <Dialog.Header>OOPS!</Dialog.Header>
          <Dialog.Body>
            The Account you are looking for does not exists.
          </Dialog.Body>
        </Dialog>
      </CenterView>
    );
  }
  return (
    <>
      <Dialog>
        <Dialog.Header>Known Names</Dialog.Header>
        <Dialog.Body>
          <List>
            {account.names.map((value, index) => (
              <List.Item key={index}>{value}</List.Item>
            ))}
          </List>
        </Dialog.Body>
      </Dialog>
    </>
  );
}
