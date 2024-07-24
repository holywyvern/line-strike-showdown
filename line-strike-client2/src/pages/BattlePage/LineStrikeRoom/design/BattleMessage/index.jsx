import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import cx from "classnames";

import styles from "./styles.module.css";

function Message({ message, type, nodeRef }) {
  const className = cx(styles.message, styles[type]);
  return (
    <div className={styles.group} ref={nodeRef}>
      <div className={className}>{message}</div>
    </div>
  );
}

export function BattleMessage({ messages }) {
  return (
    <TransitionGroup component={null} appear enter>
      {messages.map(({ message, type, key, nodeRef }) => {
        return (
          <CSSTransition
            key={`${message}-${type}-${key}`}
            nodeRef={nodeRef}
            timeout={700}
            classNames={{
              enter: styles["enter-active"],
              enterActive: styles["enter-active"],
              enterDone: styles["enter-done"],
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
