import PropTypes from "prop-types";

import { useSchema } from "../context";

import { DeckHolder } from "../design/DeckHolder";
import { PlayerName } from "../design/PlayerName";

export function PlayerDeck({ player, top }) {
  const { deckSize, sleeve } = useSchema(player);
  return (
    <>
      <DeckHolder top={top} count={deckSize} sleeve={sleeve} />
      <PlayerName player={player} top={top} />
    </>
  );
}

PlayerDeck.propTypes = {
  player: PropTypes.any,
  top: PropTypes.bool,
};
