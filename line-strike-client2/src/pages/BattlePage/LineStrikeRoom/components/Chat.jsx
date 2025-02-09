import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useHoveredCard } from "../context/HoveredCardContext";
import { Name } from "./Name";

import { useArraySchema, useBattleRoom, useBattleRoomState } from "../context";

import { useDatabase } from "../../../../contexts/DatabaseContext";

import { Button } from "../../../../design/Button";
import { Row } from "../../../../design/Row";
import { List } from "../../../../design/List";
import { Dialog } from "../../../../design/Dialog";
import { TextInput } from "../../../../design/TextInput";

// prettier-ignore
const POSITION_NAME = [
  "A1", "A2", "A3",
  "B1", "B2", "B3",
  "C1", "C2", "C3"
]

function Card({ cardID }) {
  const { cards } = useDatabase();
  // eslint-disable-next-line no-unused-vars
  const [_, setHoveredCard] = useHoveredCard();
  const card = cards[cardID];
  return (
    <a
      href="#"
      style={{ color: "dodgerblue", textDecoration: "none" }}
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHoveredCard(card)}
    >
      {card?.name}
    </a>
  );
}

Card.propTypes = {
  cardID: PropTypes.number,
};

const COMPONENTS = {
  join({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; joins
      </i>
    );
  },
  leave({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; leaves
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
        <Name id={playerID} name={name} />
        &nbsp; picks deck
      </i>
    );
  },
  mulligan({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; swaps hand
      </i>
    );
  },
  keep({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; keeps hand
      </i>
    );
  },
  turn({ turn }) {
    return <Row>Turn #{turn}</Row>;
  },
  battleStart() {
    return <Row>Card Opening</Row>;
  },
  battle() {
    return <Row>Attacks</Row>;
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
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; plays <Card cardID={cardID} /> at {POSITION_NAME[position]}
      </i>
    );
  },
  lock({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; ends their turn
      </i>
    );
  },
  stay({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; stayed
      </i>
    );
  },
  drawCard({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; draws a card
      </i>
    );
  },
  pp({ playerID, name }) {
    return (
      <i>
        <Name id={playerID} name={name} />
        &nbsp; gains PP
      </i>
    );
  },
  attack({ playerID, name, lane, damage, busters, blocks }) {
    return (
      <i>
        <Name id={playerID} name={name} /> attacks Lane #{lane + 1} dealing{" "}
        {damage} point{damage !== 1 ? "s" : ""} of damage!
        {busters ? ` (Base Busters: ${busters})` : null}
        {blocks ? ` (Base Guards: ${blocks})` : null}
      </i>
    );
  },
  break({ playerID, name, lane }) {
    return (
      <i>
        <Name id={playerID} name={name} /> breaks Lane #{lane + 1}
      </i>
    );
  },
  skill({ playerID, name, cardID }) {
    return (
      <i>
        <Name id={playerID} name={name} /> activates <Card cardID={cardID} />
        &apos;s skill!
      </i>
    );
  },
  supports({ playerID, name }) {
    return (
      <>
        <Name id={playerID} name={name} />
        &apos;s supports
      </>
    );
  },
  disrupts({ playerID, name }) {
    return (
      <>
        <Name id={playerID} name={name} />
        &apos;s disrupts
      </>
    );
  },
  buff({ position, cardID, damage }) {
    return (
      <i>
        <Card cardID={cardID} /> {damage < 0 ? "debuffs" : "buffs"} at{" "}
        {POSITION_NAME[position]} by {Math.abs(damage)}!
      </i>
    );
  },
  move({ position, newPosition, cardID }) {
    return (
      <i>
        <Card cardID={cardID} /> moves {POSITION_NAME[position]} to{" "}
        {POSITION_NAME[newPosition]}!
      </i>
    );
  },
  swap({ position, newPosition, cardID }) {
    return (
      <i>
        <Card cardID={cardID} /> swaps between {POSITION_NAME[position]} and{" "}
        {POSITION_NAME[newPosition]}!
      </i>
    );
  },
  stun({ position, cardID }) {
    return (
      <i>
        <Card cardID={cardID} /> stuns {POSITION_NAME[position]}!
      </i>
    );
  },
  elo({ playerID, name, oldValue, newValue }) {
    let diff = newValue - oldValue;
    if (diff >= 0) return `+${diff}`;
    return (
      <i>
        <Name id={playerID} name={name} />
        &apos; ELO rating goes from <strong>{oldValue}</strong> to{" "}
        <strong>{newValue}</strong> (<strong>{diff}</strong>).
      </i>
    );
  },
  recording() {
    return <i>Recording battle, please wait...</i>;
  },
  recorded({ message }) {
    const url = `https://linestrike.ar/play/replays/${message}`;
    return (
      <i>
        Battle recorded at <Link to={`/play/replays/${message}`}>{url}</Link>!
      </i>
    );
  },
};

function Section({ children }) {
  return (
    <h3
      style={{
        flex: 1,
        fontSize: "1em",
        padding: "1px",
        margin: 0,
        background: "var(--tab-active-background-color)",
        borderBottom: "1px solid var(--window-border-color)",
        borderTop: "1px solid var(--window-border-color)",
      }}
    >
      {children}
    </h3>
  );
}

Section.propTypes = {
  children: PropTypes.node,
};

const WRAPPERS = {
  turn({ children }) {
    return (
      <h2
        style={{
          flex: 1,
          fontSize: "1.2em",
          padding: "2px",
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
  battleStart: Section,
  battle: Section,
  supports: Section,
  disrupts: Section,
};

export function Chat() {
  const [list, setList] = useState(null);
  const room = useBattleRoom();
  const state = useBattleRoomState();
  const messages = useArraySchema(state.chat);
  const [text, setText] = useState("");
  const onMessageSent = (e) => {
    e.preventDefault();
    room.send("chat", text);
    setText("");
  };
  useEffect(() => {
    if (!list) return;

    list.scrollTop = list.scrollHeight;
  }, [list, messages.length]);
  return (
    <Dialog stretch flex>
      <Dialog.Header>
        <h2>Chat</h2>
      </Dialog.Header>
      <Dialog.Body>
        <List ref={setList}>
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
              maxLength={200}
              disabled={state.replay}
            />
            <Button
              type="submit"
              disabled={state.replay || text.length < 1}
            >
              Send
            </Button>
          </Row>
        </form>
      </Dialog.Body>
    </Dialog>
  );
}
