import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { BattleMessage } from "../design/BattleMessage";

import { useBattleRoom, usePlayers } from "../context";
import { useTabAudio } from "../context/TabAudioContext";

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
  const audio = useTabAudio();
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
      audio.me("battle-start");
    });
    room.onMessage("start-turn", ({ turn }) => {
      showMessage(`TURN ${turn}`);
    });
    room.onMessage("card-open", () => {
      showMessage("CARD OPEN!");
      audio.me("card-open");
    });
    room.onMessage("break", ({ playerID }) => {
      if (room.sessionId === playerID) {
        showMessage("BROKEN!", "break");
        audio.me("broken");
      } else {
        showMessage("BREAK!", "break");
        audio.me("break");
      }
    });
    room.onMessage("win", ({ playerID }) => {
      if (room.sessionId === playerID) {
        showMessage("WIN!", "message");
        audio.me("win");
      } else if (playing) {
        showMessage("LOSE!", "message");
        audio.me("lose");
      }
    });
    room.onMessage("draw", () => {
      console.log("draw...");
      audio.me("draw");
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
