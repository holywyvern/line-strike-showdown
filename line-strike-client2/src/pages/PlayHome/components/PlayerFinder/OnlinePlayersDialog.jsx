import PropTypes from "prop-types";

import { Dialog } from "../../../../design/Dialog";
import { List } from "../../../../design/List";
import { Modal } from "../../../../design/Modal";

// import { useLobby } from "../../../../contexts/LobbyContext";

import { Player } from "./Player";
import { useLobbyPlayers } from "../hooks/useLobbyPlayers";
import { Separator } from "../../../../design/Separator";
import { TextInput } from "../../../../design/TextInput";
import { useMemo, useState } from "react";

export function OnlinePlayersDialog({ onClose }) {
  // const room = useLobby();
  const [filter, setFilter] = useState("");
  const players = useLobbyPlayers();

  const filteredPlayers = useMemo(() => {
    if (filter.length < 1) return players;

    return players.filter((i) =>
      String(i.name).toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [players, filter]);

  // const challengePlayer = (clientId, formatID, message) => {
  //   room.send("challenge", { clientId, formatID, message });
  // };
  return (
    <>
      <Dialog>
        <Dialog.Header>
          <h3>Online Players ({players.length})</h3>
          <Modal.Close onClick={onClose} />
        </Dialog.Header>
        <Dialog.Body>
          <TextInput
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter players by name..."
          />
          <Separator />
          <List>
            {filteredPlayers.map((player, index) => (
              <Player key={index} player={player} />
            ))}
          </List>
        </Dialog.Body>
      </Dialog>
    </>
  );
}

OnlinePlayersDialog.propTypes = {
  onClose: PropTypes.func,
};
