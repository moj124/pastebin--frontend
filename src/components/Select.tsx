import { Fragment } from "react";
import styles from "../assets/css/select.module.css";

interface SelectOptions {
  options: (
    | { value: null; label: string }
    | { value: number; label: string }
  )[];
}

export default function Select({ options }: SelectOptions): JSX.Element {
  const select_options = options.map((element, index) => (
    <span
      key={index}
      className={styles.custom_option}
      data-value={element.value}
    >
      {element.label}
    </span>
  ));

  return (
    <Fragment>
      <div className={styles.select}>
        <div className={styles.select_trigger}>
          <div className={styles.select_arrow}></div>
        </div>
        <div className={styles.custom_options}>{select_options}</div>
      </div>
    </Fragment>
  );
}
