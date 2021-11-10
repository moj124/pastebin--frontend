import { Fragment } from "react";
import styles from "../assets/css/footer.module.css";
export default function Footer(): JSX.Element {
  return (
    <Fragment>
      <footer className={styles.footer}>
        <div className={`${styles.footer_grid}`}>
          <div className={`${styles.footer_item}`}>
            <a href="/" className={styles.footer_title}>
              Pastebin
            </a>
          </div>
          <div className={`${styles.footer_item}`}>
            <a href="/" className={styles.footer_link}>
              About
            </a>
            <a href="/" className={styles.footer_link}>
              Login
            </a>
            <a href="/" className={styles.footer_link}>
              Signup
            </a>
          </div>
          <div className={`${styles.footer_icons}`}>
            <i className="uil uil-facebook-f"></i>
            <i className="uil uil-instagram"></i>
            <i className="uil uil-twitter"></i>
          </div>
        </div>
        <p className={styles.legal_info}>
          By using Pastebin.com you agree to our cookies policy to enhance your
          experience.
        </p>
        <p className={styles.legal_info}>Site design & logo © 2021 Pastebin</p>
      </footer>
    </Fragment>
  );
}
