import { Fragment, useState } from "react";

import { Box } from "../../design/Box";
import { List } from "../../design/List";
import { Row } from "../../design/Row";
import { TextInput } from "../../design/TextInput";
import { Button } from "../../design/Button";

import { Name } from "./Name";
import { useHoveredCard, useRoom } from "./context";
import { useCards } from "../../hooks/useCards";

// prettier-ignore
const POSITION_NAME = [
  "A1", "A2", "A3",
  "B1", "B2", "B3",
  "C1", "C2", "C3"
]

const COMPONENTS = {
  join({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; joins*
      </i>
    );
  },
  leave({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; leaves*
      </i>
    );
  },
  chat({ playerID, name, message }) {
    return (
      <span>
        <Name id={playerID} name={name} />
        :&nbsp;{message}
      </span>
    );
  },
  deck({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; picks deck*
      </i>
    );
  },
  mulligan({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; swaps hand*
      </i>
    );
  },
  keep({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; keeps hand*
      </i>
    );
  },
  turn({ turn }) {
    return <Row>TURN {turn}</Row>;
  },
  battleStart() {
    return <Row>PLACING CARDS</Row>;
  },
  win({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; won!
      </i>
    );
  },
  draw() {
    return <i>The match ended in a draw...</i>;
  },
  place({ playerID, name, cardID, position }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { cards } = useCards();
    // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
    const [_, setHoveredCard] = useHoveredCard();
    const card = cards[cardID];
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; plays{" "}
        <a
          href="#"
          style={{ color: "dodgerblue", textDecoration: "none" }}
          onClick={(e) => e.preventDefault()}
          onMouseEnter={() => setHoveredCard(card)}
        >
          {card?.name}
        </a>{" "}
        at {POSITION_NAME[position]}*
      </i>
    );
  },
  lock({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; ends their turn*
      </i>
    );
  },
  stay({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; stayed*
      </i>
    );
  },
  drawCard({ playerID, name }) {
    return (
      <i>
        *<Name id={playerID} name={name} />
        &nbsp; draws a card*
      </i>
    );
  },
};

const WRAPPERS = {
  turn({ children }) {
    return (
      <h2
        style={{
          flex: 1,
          fontSize: "1.2em",
          padding: 0,
          margin: 0,
          background: "var(--tab-active-background-color)",
          borderBottom: "1px solid var(--window-border-color)",
          borderTop: "1px solid var(--window-border-color)",
        }}
      >
        {children}
      </h2>
    );
  },
  battleStart({ children }) {
    return (
      <h3
        style={{
          flex: 1,
          fontSize: "1em",
          padding: 0,
          margin: 0,
          background: "var(--tab-active-background-color)",
          borderBottom: "1px solid var(--window-border-color)",
          borderTop: "1px solid var(--window-border-color)",
        }}
      >
        {children}
      </h3>
    );
  },
};

export function Chat() {
  const room = useRoom();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const onMessageSent = (e) => {
    e.preventDefault();
    room.send("chat", text);
    setText("");
  };
  useState(() => {
    if (!room?.state?.chat) return;

    room?.state?.chat?.onAdd((item) => {
      setMessages((messages) => [...messages, item]);
    });
  }, [room?.state?.chats]);
  return (
    <Box stretch flex>
      <Box.Header>
        <h2>Chat</h2>
      </Box.Header>
      <Box.Body>
        <List>
          {messages.map(({ type, timestamp, ...props }, index) => {
            const Component = COMPONENTS[type] || COMPONENTS.chat;
            const Wrapper = WRAPPERS[type] || Fragment;
            return (
              <List.Item key={index}>
                <Wrapper>
                  <Row spaceItems flex>
                    <span>
                      <Component {...props} />
                    </span>
                    <span style={{ opacity: 0.7 }}>
                      {new Date(timestamp).toLocaleTimeString()}
                    </span>
                  </Row>
                </Wrapper>
              </List.Item>
            );
          })}
        </List>
        <form onSubmit={onMessageSent}>
          <Row>
            <TextInput
              flex
              name="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type some chat message..."
              required
            />
            <Button type="submit" disabled={text.length < 1}>
              Send
            </Button>
          </Row>
        </form>
      </Box.Body>
    </Box>
  );
}
