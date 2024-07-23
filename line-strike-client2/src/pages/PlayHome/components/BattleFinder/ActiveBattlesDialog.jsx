import PropTypes from "prop-types";

import { Dialog } from "../../../../design/Dialog";
import { List } from "../../../../design/List";
import { Modal } from "../../../../design/Modal";

import { useBattleRooms } from "../../../../hooks/useBattleRooms";

import { Match } from "./Match";

export function ActivesBattlesDialog({ onClose }) {
  const battles = useBattleRooms();
  return (
    <Dialog>
      <Dialog.Header>
        <h3>Active Matches ({battles.length})</h3>
        <Modal.Close onClick={onClose} />
      </Dialog.Header>
      <Dialog.Body>
        <List>
          {battles.map((battle, index) => (
            <Match key={index} battle={battle} />
          ))}
        </List>
      </Dialog.Body>
    </Dialog>
  );
}

ActivesBattlesDialog.propTypes = {
  onClose: PropTypes.func,
};
