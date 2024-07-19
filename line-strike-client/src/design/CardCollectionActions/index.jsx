import PropTypes from "prop-types";

import styles from "./styles.module.css";
import { Button } from "../Button";

export function CardCollectionActions({ onDetails, onRemove }) {
  return (
    <div type="button" className={styles.actions}>
      <Button onClick={onDetails}>Details</Button>
      <Button onClick={onRemove}>Remove</Button>
    </div>
  );
}

CardCollectionActions.propTypes = {
  onDetails: PropTypes.func,
  onRemove: PropTypes.func,
};
