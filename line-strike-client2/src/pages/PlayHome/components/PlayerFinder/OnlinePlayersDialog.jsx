import { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Dialog } from "../../../../design/Dialog";
import { List } from "../../../../design/List";
import { Modal } from "../../../../design/Modal";

import { Player } from "./Player";
import { useLobbyPlayers } from "../hooks/useLobbyPlayers";

import { TextInput } from "../../../../design/TextInput";
import { Button } from "../../../../design/Button";

export function OnlinePlayersDialog({ onClose }) {
  const [filter, setFilter] = useState("");
  const players = useLobbyPlayers();

  const filteredPlayers = useMemo(() => {
    if (filter.length < 1) return players;

    return players.filter((i) =>
      String(i.name).toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [players, filter]);

  const findOffline = () => {};

  return (
    <>
      <Dialog>
        <Dialog.Header>
          <h3>Player Finder</h3>
          <Modal.Close onClick={onClose} />
        </Dialog.Header>
        <Dialog.Body>
          <TextInput
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Find players by name..."
          />
          <Button onClick={findOffline} disabled={filter.length < 1}>
            Find offline players
          </Button>
          <br />
          <h4>Online Players ({players.length})</h4>
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
