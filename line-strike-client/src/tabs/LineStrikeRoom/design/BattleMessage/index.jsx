import { useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./styles.module.css";

function Message({ message, type }) {
  const [visible, setVisible] = useState(true);
  const nodeRef = useRef(null);
  const className = cx(styles.message, styles[type]);
  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  return (
    <CSSTransition
      timeout={1_000}
      in={visible}
      mountOnEnter
      unmountOnExit
      classNames={{
        appear: styles.appear,
        appearActive: styles["appear-active"],
        appearDone: styles["appear-done"],
        enter: styles["appear-active"],
        enterActive: styles["appear-active"],
        enterDone: styles["appear-done"],
        exit: styles.exit,
        exitActive: styles["exit-active"],
        exitDone: styles["exit-done"],
      }}
    >
      <div ref={nodeRef} className={className}>
        {message}
      </div>
    </CSSTransition>
  );
}

export function BattleMessage({ messages }) {
  const className = cx(styles.group, { [styles.visible]: messages.length > 0 });
  return (
    <TransitionGroup className={className} appear enter exit>
      {messages.map(({ message, type, key }) => {
        return (
          <Message
            key={`${message}-${type}-${key}`}
            message={message}
            type={type}
          />
        );
      })}
    </TransitionGroup>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

BattleMessage.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any),
};
