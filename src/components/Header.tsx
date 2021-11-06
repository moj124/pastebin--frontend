import { useEffect, useState } from "react";
import styles from "../assets/css/header.module.css";

export default function Header(): JSX.Element {
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", lightTheme);
  }, [lightTheme]);

  return (
    <header className={`${styles.header}`}>
      <nav className={styles.nav}>
        <a href="/" className={styles.nav_logo}>
          Pastebin
        </a>
        <ul className={styles.nav_list}>
          <li className="nav_item">
            <a href="/" className={styles.nav_link}>
              About
            </a>
          </li>
          <li className="nav_item">
            <a href="/" className={styles.nav_link}>
              Login
            </a>
          </li>
          <li className="nav_item">
            <a href="/" className={styles.nav_link}>
              Signup
            </a>
          </li>
        </ul>

        <i
          className={
            !lightTheme
              ? "uil uil-moon change-theme"
              : "uil uil-moon change-theme uil-sun"
          }
          id="theme-button"
          onClick={() => setLightTheme(!lightTheme)}
        ></i>
      </nav>
    </header>
  );
}
