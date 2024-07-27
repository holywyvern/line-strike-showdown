import { useState } from "react";
import PropTypes from "prop-types";

import { Dialog } from "../../../../design/Dialog";
import { Modal } from "../../../../design/Modal";
import { TextInput } from "../../../../design/TextInput";
import { Button } from "../../../../design/Button";
import { List } from "../../../../design/List";

import { useLobbyPlayers } from "../hooks/useLobbyPlayers";

import { AccountService } from "../../../../services/AccountServices";

import { Player } from "./Player";

export function OfflinePlayersDialog({ onClose, style }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const online = useLobbyPlayers();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (name.length < 1) return;

    setLoading(true);
    const players = await AccountService.search(name);
    setPlayers(
      players.map((player) => {
        player.sessionID = online.find(
          (i) => i.accountID === player.accountID
        )?.sessionID;
        return player;
      })
    );
    setLoading(false);
  };
  return (
    <Dialog stretch style={style}>
      <Dialog.Header>
        <h3>Search Players</h3>
        <Modal.Close onClick={onClose} />
      </Dialog.Header>
      <Dialog.Body>
        <form onSubmit={onSubmit}>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Find players by name..."
            required
            disabled={loading}
          />
          <Button type="submit" disabled={loading || name.length < 1}>
            Find players
          </Button>
        </form>
        <br />
        <List>
          {players.map((player, index) => (
            <Player player={player} key={index} />
          ))}
        </List>
      </Dialog.Body>
    </Dialog>
  );
}

OfflinePlayersDialog.propTypes = {
  onClose: PropTypes.func,
  style: PropTypes.any,
};
