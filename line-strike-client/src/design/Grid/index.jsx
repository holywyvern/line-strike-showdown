import PropTypes from "prop-types";
import styles from "./styles.module.css";

export function Grid({ children, columns, columnFormat }) {
  return (
    <div
      className={styles.grid}
      style={{ "--columns": columns, "--column-format": columnFormat }}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.number,
  columnFormat: PropTypes.string,
};
