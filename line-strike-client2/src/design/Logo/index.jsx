
import styles from "./styles.module.scss";

export function Logo() {
  return <div className={styles.logo}>
    <img src="logo.png" alt="Line Strike Logo" />
    <div className={styles.text}>
      <h1>LINE STRIKE</h1>
      <h2>SHOWDOWN! <small>ALPHA</small></h2>
    </div>
  </div>
}