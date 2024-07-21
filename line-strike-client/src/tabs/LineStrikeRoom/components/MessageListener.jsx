import PropTypes from "prop-types";
import { useBattleRoom, usePlayers } from "../context";
import { useEffect, useState } from "react";
import { BattleMessage } from "../design/BattleMessage";
import { AudioManager } from "../../../utils/AudioManager";

function useMessageDisplay() {
  const [style, setStyle] = useState("message");
  const [display, setDisplay] = useState(null);
  const [key, setKey] = useState(() => Date.now());
  const [handle, setHandle] = useState(null);

  const showMessage = (message, style = "message") => {
    setHandle((old) => {
      if (old !== null) {
        clearTimeout(old);
      }
      setStyle(style);
      setDisplay(message);
      setKey(Date.now());
      const timeout = setTimeout(() => {
        setHandle((old) => {
          if (old === timeout) {
            setDisplay(null);
            clearTimeout(old);
            return null;
          }
          return old;
        });
      }, 1_500);
      return timeout;
    });
  };
  return { style, message: display, handle, showMessage, key };
}

export function MessageListener({ children }) {
  const { playing } = usePlayers();
  const [ready, setReady] = useState(false);
  const room = useBattleRoom();
  const { style, message, key, showMessage } = useMessageDisplay();
  useEffect(() => {
    if (ready) return;
    if (!room) return;

    setReady(true);
    room.onMessage("battle-start", () => {
      showMessage("BATTLE START!");
      AudioManager.playMe({ name: "start", volume: 100 });
    });
    room.onMessage("start-turn", ({ turn }) => {
      showMessage(`TURN ${turn}`);
    });
    room.onMessage("card-open", () => {
      showMessage("CARD OPEN!");
      AudioManager.playMe({ name: "card-open", volume: 100 });
    });
    room.onMessage("break", ({ playerID }) => {
      if (room.sessionId === playerID) {
        showMessage("BROKEN!", "break");
        AudioManager.playMe({ name: "broken", volume: 100 });
      } else {
        showMessage("BREAK!", "break");
        AudioManager.playMe({ name: "break", volume: 100 });
      }
    });
    room.onMessage("win", ({ playerID }) => {
      if (room.sessionId === playerID) {
        showMessage("WIN!", "message");
        AudioManager.playMe({ name: "win", volume: 100 });
      } else if (playing) {
        showMessage("LOSE!", "message");
        AudioManager.playMe({ name: "lose", volume: 100 });
      }
    });
    room.onMessage("draw", () => {
      console.log("draw...");
      AudioManager.playMe({ name: "draw", volume: 100 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, ready, playing]);
  return (
    <>
      {children}
      <BattleMessage message={message} type={style} messageKey={key} />
    </>
  );
}

MessageListener.propTypes = {
  children: PropTypes.node,
};
