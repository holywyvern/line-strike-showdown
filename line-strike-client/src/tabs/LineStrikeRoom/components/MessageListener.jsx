import { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { BattleMessage } from "../design/BattleMessage";

import { useBattleRoom, usePlayers } from "../context";
import { useTabAudio } from "../context/TabAudioContext";

function useMessageDisplay() {
  const [messages, setMessages] = useState([]);

  const showMessage = (message, type = "message") => {
    setMessages((messages) => {
      if (messages.some((i) => i.message === message && i.type === type))
        return messages;

      const newMessages = [...messages];
      const newMessage = {
        message,
        key: Date.now(),
        type,
        nodeRef: createRef(),
      };
      newMessages.push(newMessage);
      setTimeout(() => {
        setMessages((messages) => {
          const index = messages.indexOf(newMessage);
          if (index < 0) return messages;

          const newMessages = [...messages];
          newMessages.splice(index, 1);
          return newMessages;
        });
      }, [1_500]);
      return newMessages;
    });
  };
  return { messages, showMessage };
}

export function MessageListener({ children }) {
  const audio = useTabAudio();
  const { playing } = usePlayers();
  const [ready, setReady] = useState(false);
  const room = useBattleRoom();
  const { messages, showMessage } = useMessageDisplay();
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
      <BattleMessage messages={messages} />
    </>
  );
}

MessageListener.propTypes = {
  children: PropTypes.node,
};
