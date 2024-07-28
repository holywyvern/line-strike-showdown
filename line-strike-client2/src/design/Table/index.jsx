import PropTypes from "prop-types";

import styles from "./styles.module.scss";

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

function TableCell({ children, colSpan }) {
  return <td colSpan={colSpan}>{children}</td>;
}

function TableHeader({ children, colSpan }) {
  return <th colSpan={colSpan}>{children}</th>;
}

function TableHead({ children }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function Table({ children }) {
  return <table className={styles.table}>{children}</table>;
}

Table.Head = TableHead;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

TableHeader.propTypes = {
  colSpan: PropTypes.number,
  children: PropTypes.node,
};

TableCell.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.number,
};

TableRow.propTypes = {
  children: PropTypes.node,
};

TableHead.propTypes = {
  children: PropTypes.node,
};

TableBody.propTypes = {
  children: PropTypes.node,
};

Table.propTypes = {
  children: PropTypes.node,
};
