import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import cx from "classnames";

import styles from "./styles.module.css";

function Message({ message, type, nodeRef }) {
  const className = cx(styles.message, styles[type]);
  return (
    <div ref={nodeRef} className={className}>
      {message}
    </div>
  );
}

export function BattleMessage({ messages }) {
  const className = cx(styles.group, { [styles.visible]: messages.length > 0 });
  return (
    <TransitionGroup className={className} appear enter exit>
      {messages.map(({ message, type, key, nodeRef }) => {
        return (
          <CSSTransition
            key={`${message}-${type}-${key}`}
            nodeRef={nodeRef}
            timeout={1_000}
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
            <Message message={message} type={type} nodeRef={nodeRef} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  nodeRef: PropTypes.any,
};

BattleMessage.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any),
};
