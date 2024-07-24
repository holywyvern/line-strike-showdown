import { Popover as ReactPopover, ArrowContainer } from "react-tiny-popover";

import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export function Popover({
  open,
  children,
  onClose,
  content,
  align,
  positions,
  reposition,
  nudgedLeft,
  nudgedTop,
  transform,
}) {
  return (
    <ReactPopover
      isOpen={open}
      onClickOutside={onClose}
      positions={positions}
      reposition={reposition}
      nudgedLeft={nudgedLeft}
      nudgedTop={nudgedTop}
      align={align}
      transform={transform}
      transformMode="relative"
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="var(--dialog-background-color)"
          arrowSize={12}
          className={styles.popover}
          arrowClassName={styles.arrow}
        >
          <div className={styles.content}>{content}</div>
        </ArrowContainer>
      )}
    >
      {children}
    </ReactPopover>
  );
}

Popover.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  content: PropTypes.node,
  align: PropTypes.string,
  positions: PropTypes.arrayOf(PropTypes.string),
  reposition: PropTypes.bool,
  nudgedLeft: PropTypes.number,
  nudgedTop: PropTypes.number,
  transform: PropTypes.any,
};
