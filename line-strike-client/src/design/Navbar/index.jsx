import PropTypes from "prop-types";
import styles from "./styles.module.css";

function NavbarTitle({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

NavbarTitle.propTypes = {
  children: PropTypes.node,
};

function NavbarUser({ children }) {
  return <div className={styles.children}>{children}</div>;
}

NavbarUser.propTypes = {
  children: PropTypes.node,
};

export function Navbar({ children }) {
  return <nav className={styles.nav}>{children}</nav>;
}

Navbar.propTypes = {
  children: PropTypes.node,
};

Navbar.User = NavbarUser;
Navbar.Title = NavbarTitle;
